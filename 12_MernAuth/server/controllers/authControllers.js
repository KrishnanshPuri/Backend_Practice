import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userMODEL.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailtemplate.js";

export const register = async (req, res) => {
    console.log('in register');
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.json({ success: false, message: "Please fill all fields" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                sender: { email: process.env.SENDER_EMAIL, name: "Auth App" },
                to: [{ email: user.email }],
                subject: "Welcome to our Auth App",
                textContent: `Hi ${user.name},\n\nThank you for registering! We're excited to have you.\n\nBest,\nAuth Team`
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.log("Brevo API Blocked Us:", data);
        }

        return res.json({ success: true, message: "User registered", user: { name: user.name, email: user.email } });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
export const login = async(req,res)=>{
     console.log('in login');
    const {email,password} = req.body;
    if(!email || !password){
        return res.json({success:false,message:"Please fill all the fields"});
     }
     try {
        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false,message:"User does not exist"});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.json({success:false,message:"Invalid credentials"});
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
  
  res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge:7*24*60*60*1000
  }).json({success:true,message:"User logged in successfully",user:{name:user.name,email:user.email}});

     } catch (error) {
        res.json({success:false,message:error.message});
     }
}

export const logout = (req,res)=>{
     console.log('in logout');
    res.clearCookie("token",{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
    }).json({success:true,message:"User logged out successfully"});
}

export const sendVerifyOtp = async(req,res)=>{
     console.log('in sendverifyotp');
 try {
    const {userId}=req.body;

    const user = await User.findById(userId);
    
    if(user.isAccountVerified){
        return res.json({success:false,message:"Account is already verified"});
    }
    
    const otp = String(Math.floor(Math.random()*900000 +100000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10*60*1000; // 10 minutes
    
    await user.save();


     const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY, 
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { email: process.env.SENDER_EMAIL, name: "Auth App" },
        to: [{ email: user.email }],
        subject: "Your Account Verification OTP",
        htmlContent: EMAIL_VERIFY_TEMPLATE(otp)
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
        console.log("Brevo API Blocked Us:", data);
        return res.json({ success: false, message: "Email API failed to send" });
    }

    console.log("Brevo Success:", data);

      res.json({success:true,message:"OTP sent to your email address"});

} catch (error) {
    res.json({success:false,message:error.message});
}
}

export const verifyEmail = async(req,res)=>{
   console.log('in verfyemail');
    const {userId,otp}=req.body;

    if(!userId || !otp){
        return res.json({success:false,message:"Please provide all the fields"});
    }

    try {

        const user = await User.findById(userId);

        if(!user){
            return res.json({success:false,message:"User does not exist"});
        }

        
       if(user.verifyOtp==='' || user.verifyOtp != otp ){
        return res.json({success:false,message:"Invalid OTP"});
       }

       if(user.verifyOtpExpireAt < Date.now()){
        return res.json({success:false,message:"OTP has expired"});
       }
     
       user.isAccountVerified = true;
       user.verifyOtp = '';
       user.verifyOtpExpireAt = 0;

         await user.save();

         res.json({success:true,message:"Email verified successfully"});

    } catch (error) {
        res.json({success:false,message:error.message});
        
    }

}

export const isAuthenticated = async(req,res)=>{
     console.log('in isAuthenticated');
try {

    return res.json({success:true})
} catch (error) {
    res.json({success:false,message:error.message})
}
}

export const sendResetOtp = async(req,res)=>{
     console.log('in sendResetOtp');
    const {email}= req.body;

    if(!email){
        return res.json({success:false,message:'Email not provided'})
    }

    try {
    
        const user = await User.findOne({email});
        if(!user){
            return res.json({success:false,message:'User doesnt exsist'});
        }
        
       const otp = String(Math.floor(Math.random()*900000 +100000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10*60*1000; // 10 minutes
    
    await user.save();


     
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY, 
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { email: process.env.SENDER_EMAIL, name: "MERN Auth App" },
        to: [{ email: user.email }],
        subject: "Password Reset OTP",
        htmlContent: PASSWORD_RESET_TEMPLATE(otp)
      })
    });

    const data = await response.json();
    
   
    if (!response.ok) {
        console.log("Brevo API Blocked Us:", data);
        return res.json({ success: false, message: "Email API failed to send" });
    }

    console.log("Brevo Success:", data);

      return res.json({success:true,message:"OTP sent to your email address"});
        
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export const resetPassword = async(req,res)=>{
     console.log('in resetPassword');
    const {email,otp,newpassword}= req.body;

    if(!email||!otp|| !newpassword){
        return res.json({success:false,message:'Email,OTP,New Password are required'});
    }
    
    try {
        
    const user = await User.findOne({email});
    if(!user){
        return res.json({success:false,message:'User not Found'});
    }

    if(user.resetOtp===''|| user.resetOtp!== otp){
        return res.json({success:false,message:'Invalid OTP'})
    }
    
    if(user.resetOtpExpireAt < Date.now()){
         return res.json({success:false,message:'OTP Expired'})
    }
    const hashedPassword = await bcrypt.hash(newpassword,10);

    user.password=hashedPassword;
    user.resetOtp='';
    user.resetOtpExpireAt=0;

    await user.save();

    return res.json({success:true,message:"Password Reset Successfully"});
   

    } catch (error) {
         return res.json({success:false,message:error.message});
    }



}

// Backend Completed 
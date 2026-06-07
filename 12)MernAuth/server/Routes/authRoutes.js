import express from "express";

import { login, register, logout, sendVerifyOtp, verifyEmail, isAuthenticated } from "../controllers/authControllers.js";
import userAuth from "../MiddleWare/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
authRouter.post("/send-verify-otp",userAuth,sendVerifyOtp);
authRouter.post("/verify-account",userAuth,verifyEmail);
// this is for my frontend 
authRouter.post("/is-auth",userAuth,isAuthenticated);


export default authRouter;

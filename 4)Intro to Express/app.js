
 // Local Modules
const {UserReq} = require('./user');
const reqhandler=UserReq;

// Third Party Modules
const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log('Middleware 1');
    next();
})

app.use((req,res,next)=>{
    console.log('Middleware 2');
    res.send('<h1>Hello Guys</h1>');
    next();// error because we are trying to send response again in the next middleware i.e setting headers after they are already sent, so we will comment this next() and see the output
})
app.use((req,res,next)=>{
    console.log('Middleware 3');     
    res.send('<h1>Hello Guys</h1>');
})

const PORT= 3000;
app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
    
});

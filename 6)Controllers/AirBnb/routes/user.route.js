const express = require("express");
const UserRouter=express.Router();
const path = require("path");

UserRouter.get("/",(req,res,next)=>{
    console.log(req.body);
    res.sendFile(path.join(__dirname,"../views/Home.html"));
});

module.exports=UserRouter;
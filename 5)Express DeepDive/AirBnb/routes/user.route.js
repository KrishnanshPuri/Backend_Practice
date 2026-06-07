const express = require("express");
const UserRouter=express.Router();
const path = require("path");


const {registeredHomes}=require('./host.route');



UserRouter.get("/",(req,res,next)=>{
    console.log(registeredHomes);
    res.render('Home',{homes:registeredHomes});
});

module.exports=UserRouter;
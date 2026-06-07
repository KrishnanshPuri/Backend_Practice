const express = require("express");
const HostRouter=express.Router();
const path = require("path");


HostRouter.get("/add-home",(req,res,next)=>{
  res.sendFile(path.join(__dirname,"../views/AddHome.html"));
});

const registeredHomes=[];
HostRouter.post("/add-home",(req,res,next)=>{
     console.log("Home Registration Succesfull for: ",req.body);
     registeredHomes.push({houseName: req.body.homeName,location: req.body.location,price: req.body.price});
     res.sendFile(path.join(__dirname,"../views/HomeAdded.html"));
});



exports.HostRouter =HostRouter;
module.exports.registeredHomes=registeredHomes;
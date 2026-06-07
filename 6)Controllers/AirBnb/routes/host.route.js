const express = require("express");
const HostRouter=express.Router();
const path = require("path");

const homesController = require("../Controllers/Home.controller");

HostRouter.get("/add-home",homesController.getAddHome);

HostRouter.post("/add-home",homesController.postAddHome);



module.exports=HostRouter;
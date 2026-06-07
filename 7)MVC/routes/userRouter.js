// Core Modules
const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router();

// Local Module


const homeController = require("../Controllers/home");

userRouter.get("/",homeController.gethome);

module.exports = userRouter;
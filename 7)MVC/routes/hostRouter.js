// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");

const homeController = require("../Controllers/home");

hostRouter.get("/add-home",homeController.addHome)

hostRouter.post("/add-home",homeController.postHome)

exports.hostRouter = hostRouter;


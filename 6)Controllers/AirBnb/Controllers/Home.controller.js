const path = require("path");
exports.getAddHome = (req,res,next)=>{
  res.sendFile(path.join(__dirname,"../views/AddHome.html"));
}

exports.postAddHome = (req,res,next)=>{
     console.log(req.body);
  res.sendFile(path.join(__dirname,"../views/HomeAdded.html"));
}
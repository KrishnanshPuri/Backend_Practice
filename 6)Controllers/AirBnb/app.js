const path = require("path");

const express = require("express");
const app = express();
const UserRouter=require('./routes/user.route');
const HostRouter=require('./routes/host.route');
const PORT=3000;

app.use((req,res,next)=>{
    console.log('First Middleware');
    console.log(req.url,req.method);
    next();
});

app.use(express.urlencoded({extended:true})); // To Parse Form Data

app.use(UserRouter);

app.use("/host",HostRouter);

app.use(express.static(path.join(__dirname,'Public'))) // To Serve Static Files

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,"views/404.html"));
})

app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
});
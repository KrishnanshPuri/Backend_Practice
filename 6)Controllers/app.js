const express = require('express');
const bodyParser = require('body-parser');

const app = express();


app.use((req,res,next)=>{
    console.log(' First Dummy Middleware 1');
    console.log(req.path);
    next();
})

app.use((req,res,next)=>{
    console.log(' Second Dummy Middleware 2');
console.log(req.method);
next();
});

// app.use((req,res,next)=>{
//     res.send('<h1>Hello Guys</h1>');
   
// });

app.get('/',(req,res,next)=>{
    console.log('Fourth MIddleware');
    res.send(`<h1>Hello Guys</h1>`);
});

app.get('/contact-us',(req,res,next)=>{
    console.log('Fifth Middleware');
    res.send(`
        <h1>Please Give Your Details Here</h1>
        <form action="/contact-us" method="post">
        <input type="text" name="username" placeholder="Enter your name"/><br>
        <input type="email" name="email" placeholder="Enter your email"/><br>
        <button type="submit">Submit</button>
        </form>
        `);
});

app.post('/contact-us',(req,res,next)=>{
    console.log('Sixth-a Middleware',req.body);
    next();
});

// UP above the body is not defined yet because we didnt used any parser to parse the body of the request so we need to use body parser middleware to parse the body of the request and make it available in req.body

app.use(bodyParser.urlencoded({extended:true}));

// Now whats this bodyParse? It does the same work we did manually i.e take chunks push in body the concat in BUffer and then convert to string and then parse the string to get the object and then assign it to req.body so that we can access it in our route handler


app.post('/contact-us',(req,res,next)=>{
    console.log('Sixth-b Middleware',req.body);
    res.send('<h1>Thanks for submitting your details</h1>');
});

const PORT=3000; 

app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
});
// Change your import at the top of handler.js to grab the function out of the object:
const { sumRequestHandler } = require("./sum");

const reqHandler=(req,res)=>{
console.log(req.url, req.method);
if(req.url === '/'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('Welcome to Home Page');
    res.write('<head><title>Calculator</title></head>');
    res.write('<body>')   
    res.write(`
        <h1>Simple Calculator</h1>
        <a href="/calculator">Go to Calculator</a>
        </body>
        </html>
        `);
        return res.end();
}
else if(req.url === '/calculator'){
    res.write('<html>');
    res.write('<head><title>Calculator</title></head>');
    res.write('<body>')   
    res.write(`
        <h1>Here is the Calculator</h1>
        <form action = "/calculator-result" method = "post">
        <input type="text" placeholder="Enter first number"/ name = "first"><br>
        <input type="text" placeholder="Enter second number"/ name = "second"><br>
       <button type="submit">Calculate</button>
       </form>
        </body>
        </html>
        `);
        return res.end();
}
 else if(req.url === '/calculator-result' && req.method === 'POST'){
return sumRequestHandler(req,res);}
}
exports.handler=reqHandler;

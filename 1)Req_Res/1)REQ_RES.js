const http = require('http');
const file=require('fs');
const server = http.createServer((req,res)=>{
    console.log(req.url)
    console.log(req.method)
    console.log(req.headers);
    if(req.url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('Welcome to Home Page');
        res.write('<head><title>Hello</title></head>');
        res.write('<body>')   
        res.write('<form action="/sumbit" method="post">')
        res.write('<input type="text" name="username"/><button type="submit">Submit</button></form>');
        res.write('</body>');
        res.write('</html>');
        res.end();
        return;
                                
    }
    // Now here we are going to handle the post req to /sumbit , though we need to handle the data coming from the form in the home page, but for now we will just write some data to a file and then redirect to home page again
    else if(req.url === '/sumbit' && req.method === 'POST'){
        file.writeFileSync('data.txt','Hello Guys');
        res.statusCode = 302;
        res.setHeader('Location','/');
        res.end();
        return;
    }
       
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Hello</title></head>');
    res.write('<body><h1>Hello Guys</h1></body>')
    res.write('</html>');
    res.end();
})


server.listen(3000,()=>{
    console.log('Server is Running');
    
});

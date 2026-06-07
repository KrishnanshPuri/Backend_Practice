    const file = require('fs');
const UserReq= ( req,res)=>{ console.log(req.url)
    console.log(req.method)
    if(req.url === '/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('Welcome to Home Page');
        res.write('<head><title>Hello</title></head>');
        res.write('<body>')   
        res.write('<form action="/sumbit" method="post">')
        res.write('<input type="text" name="username" placeholder="Enter your name"/><br>')
        res.write('<input type="radio" name="gender" value="male">Male<br>') 
        res.write('<input type="radio" name="gender" value="female">Female<br>')
        res.write('<button type="submit">Submit</button></form>');
        res.write('</body>');
        res.write('</html>');
        res.end();
        return;
                                
    }
    // Now here we are going to handle the post req to /sumbit , though we need to handle the data coming from the form in the home page, but for now we will just write some data to a file and then redirect to home page again
    else if(req.url === '/sumbit' && req.method === 'POST'){
        const body = [];
        req.on('data',(chunk)=>{
            body.push(chunk);
        })
        req.on('end',()=>{
            const fullBody = Buffer.concat(body).toString();
            console.log(fullBody);
            const params = new URLSearchParams(fullBody);
            for(const [key, value] of params.entries()){
                console.log(`${key}: ${value}`);
            }
            const reqbody=Object.fromEntries(params);
            file.writeFileSync('data.txt',JSON.stringify(reqbody));
        })
     
        res.statusCode = 302;
        res.setHeader('Location','/not page');
        res.end();
        return;
    }
       
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>Hello</title></head>');
    res.write('<body><h1>Hello Guy Its Sumbitted</h1></body>')
    res.write('</html>');
    res.end();
}
exports.UserReq=UserReq;

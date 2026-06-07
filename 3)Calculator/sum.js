const fs = require('fs');
const sumRequestHandler=(req,res)=>{
    console.log(req.url, req.method);
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
        fs.writeFileSync('data.txt',JSON.stringify(reqbody));
        const result= Number(params.get('first')) + Number(params.get('second'));
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>Result</title></head>');
        res.write('<body>')   
        res.write(`
            <h1>Result of ${params.get('first')} + ${params.get('second')} = ${result}</h1>
            </body>
            </html>
            `);
            return res.end();
    })
}
exports.sumRequestHandler=sumRequestHandler;
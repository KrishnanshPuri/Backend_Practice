const http = require('http');
const handler =require('./handler');

const server = http.createServer(handler.handler);

const PORT= 3000;
server.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`);
    
});



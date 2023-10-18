const http = require('http');
const colors=require('colors');
console.log('hellow'.red);
http.createServer((req,res)=>{
    res.write('hey vivfgas');
   
    res.end();
}).listen(3000);

const fs= require('fs');
const express = require('express');
const app= express();


app.get('/' , (req , res)=>{

    // const rsstream= fs.createReadStream('./stream/input.txt');
    // rsstream.pipe(res);
    const name= req.query.name;
    const age = req.query.age;
   
    res.status(200).send(`name:${name} and age:${age}`)
   

})
app.listen(3000);



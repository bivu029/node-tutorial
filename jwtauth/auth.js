const express = require('express');
const jwt = require('jsonwebtoken');
const app =express();

app.get('/' , (req , res)=>{

  // res.send('hello from simple server :)')
   res.json({
        message:'sample api'
   })

});

//post login
app.post('/login' , (req , res)=>{

    const user={
        id:'7',
        username:"bkok",
        email:"hssk@gmail.com",
    }
   res.send('hello from simple server :)')

})

app.listen(3000);
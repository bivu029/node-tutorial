//midleware
const express= require('express');
const route= express.Router();
const requestFilter=require('./filter');

route.use(requestFilter);
route.get('/',(req,res)=>{
   res.send('hellow user this main route page');
});
route.get('/user',(req,res)=>{
   res.send('hellow user route user page');
});
route.get('/help',(req,res)=>{
   res.send('we ned help route help page');
});

module.exports = route;
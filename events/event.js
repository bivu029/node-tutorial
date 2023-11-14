const express= require('express');
const EventEmitter= require('events');
const app= express();

const event= new EventEmitter()
const eventName= 'countapi called';
let count= 0;

event.on(eventName,()=>{
    count++;
    console.log("count event calling",count)
})

app.get('/' , (req , res)=>{

   res.send('hello from simple server :)')
   event.emit(eventName);

});
app.listen(3000);
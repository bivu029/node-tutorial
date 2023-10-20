const express= require('express');
const data= require('./data');
const app = express();
const route=require('./middleware');
const dataBaseConnection= require('./mongodb');


const getbusLIst= async()=>{
      let data=  await dataBaseConnection();
       data= await data.find({}).toArray();
      console.log(data);
}
getbusLIst();

app.use('/route',route);
app.get('/',(req,res)=>{
   
    res.send(`welcome to home page`);
})
app.get('/about',(req,res)=>{
    res.send([data]);
});

app.listen(3000);
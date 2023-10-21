const mongoose = require('mongoose');
const BusSchema= require('./bus_schema');
const data= require('../data');


const creatbus= async()=>{
  
    await mongoose.connect('mongodb://localhost:27017/userlist');
    const BusModel= mongoose.model('user',BusSchema);
    let busdata= new BusModel(data);
    let result= await busdata.save();
    console.log(result);
}
creatbus();
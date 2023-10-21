const mongoose = require('mongoose');
const BusModel= require('./bus_model');

mongoose.connect('mongodb://localhost:27017/userlist');
const findBus= async()=>{
    const getbus= await BusModel.find({});
    console.log(getbus);

}

findBus();
const mongoose = require('mongoose');
const BusModel= require('./bus_model');

mongoose.connect('mongodb://localhost:27017/userlist');
const deletBus=async({busname=''}={})=>{
    const result = await BusModel.find({busName:busname});
    const isbusExist= ()=>{
        const isresultNull= result.length==0?true:false
        const busExist= !isresultNull? result[0]['busName']== busname? true:false:false;
      
        return busExist; 
       }
       if(isbusExist()){
        const resultData =await BusModel.deleteOne({busName:busname});
        console.log(resultData);
       }else{
        console.log('no such bus exist');
       }

}
deletBus({busname:"biavs travels"})
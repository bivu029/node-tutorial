const mongoose = require('mongoose');
const BusModel= require('./bus_model');

mongoose.connect('mongodb://localhost:27017/userlist');

const updataBus= async({busname='',
                        busnumber=null,
                        publictransport=null,
                        startfrom='',

                        }={})=>{
    const result = await BusModel.find({busName:busname});
    const isbusExist= ()=>{
        const isresultNull= result.length==0?true:false
        const busExist= !isresultNull? result[0]['busName']== busname? true:false:false;
        return busExist; 
       }

    if(isbusExist()){
        const myQuery= {busName:busname};
        const newvalues = { $set: {busName:busname==''?result.busName:busname ,
                            busNumber:busnumber==null?result.busNumber:busnumber,
                            publicTransport:publictransport==null?result.publicTransport:publictransport,
                            startFrom:startfrom==''?result.startFrom:startfrom,
                            
                           }, 
                     };
        const update= await BusModel.updateOne(myQuery,newvalues);
        console.log(update);
    }else{
        console.log('no bus exist');
    }

}
updataBus({busname:'biavs travels',publictransport:false})
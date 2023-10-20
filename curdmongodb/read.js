const { busName } = require('../data');
const dataBaseConnection= require('../mongodb');

const findData= async({busname=''}={})=>{
    console.log(busname);
    const db = await dataBaseConnection();
    const result= await db.find({busName:busname}).toArray();
    //console.log(result);
   // const r= await db.dud
  
   if(result.length !=0){
     result.forEach((bus)=>{
        console.log(bus._id);
        console.log( bus.busName==busname);
     }
     );
   }else{
    console.log('no data found');
   }
   
}
findData({busname:'biavs'});
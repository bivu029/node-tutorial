const dataBaseConnection= require('../mongodb');

const deletBusData= async({busname=''}={})=>{
    const db= await dataBaseConnection();
    const result= await db.findOne({busName:busname});
    const isbusExist= ()=>{
    const isresultNull= result==null?true:false
    const busExist= !isresultNull? result['busName']== busname? true:false:false;
   
    return busExist; 
   }
   console.log(isbusExist());
   if(isbusExist ==true){
    const resultData =await db.deleteOne({busName:busname});
    console.log(resultData);
   }else{
    console.log('no data exist');
   }
    
}

deletBusData({busname:'biavs'});
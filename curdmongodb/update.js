const dataBaseConnection= require('../mongodb');
//const data= require('../data');
const updateOneData= async({busname='',
                            busnumber=null,
                            publictransport=null,
                            startfrom='',

                            }={})=>{
    const db= await dataBaseConnection();
    const result= await db.findOne({busName:busname});
    const isbusExist= ()=>{
    const isresultNull= result==null?true:false
    const busExist= !isresultNull? result['busName']== busname? true:false:false;
    return busExist; 
   }
   
   if(isbusExist()){
    const myQuery= {busName:busname};
   var newvalues = { $set: {busName:busname==''?result.busName:busname ,
                            busNumber:busnumber==null?result.busNumber:busnumber,
                            publicTransport:publictransport==null?result.publicTransport:publictransport,
                            startFrom:startfrom==''?result.startFrom:startfrom,
                            
                           }, 
                     };
    const update= await db.updateOne(myQuery,newvalues);

    console.log(update);

  }else{
    console.log('no data is updated')
  }


}
updateOneData({busname:'biavs'})
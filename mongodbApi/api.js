const express= require('express');
const dataBaseConnection= require('../mongodb');
const data= require('../data');
const mongodb= require('mongodb');
const app= express();
app.use(express.json());

//get

app.get('/',async(req,res)=>{

    const db= await dataBaseConnection();
    const result= await db.find().toArray();
    res.send(result);

},);

//post
app.post('/',async(req,res)=>{
  
    const db= await dataBaseConnection();
    const busresult= await db.findOne({busName:req.body.busName});
   
    if(busresult==null ){
        const result= await db.insertMany([req.body]);
        res.send(result);
        if(result.acknowledged){
            console.log('data has been inserted');
        }
    }else{
        res.send('busname already exist')
    }
   
    

})
//update
app.put("/:busname",async(req,res)=>{
    const db= await dataBaseConnection();
    const result= await db.findOne({busName:req.params.busname});
    const isbusExist= ()=>{
    const isresultNull= result==null?true:false
    const busExist= !isresultNull? result['busName']== req.params.busname? true:false:false;
  
    return busExist; 
   }
   if(isbusExist()){
    const myQuery= {busName:req.params.busname};
   var newvalues = { $set: {busName:req.body.busName==''?result.busName:req.body.busName ,
                            busNumber:req.body.busNumber==null?result.busNumber:req.body.busNumber,
                            publicTransport:req.body.publicTransport==null?result.publicTransport:req.body.publicTransport,
                            startFrom:req.body.startfrom==''?result.startFrom:req.body.startfrom,
                            
                           }, 
                     };
    const update= await db.updateOne(myQuery,newvalues);
   
    res.send(update);

  }else{
    res.send('no bus exist ');
  }

});

//delete
app.delete("/:busname",async(req,res)=>{

    const db= await dataBaseConnection();
    const result= await db.findOne({busName:req.params.busname});
   
    const isbusExist= ()=>{
    const isresultNull= result==null?true:false
    const busExist= !isresultNull? result['busName']== req.params.busname? true:false:false;
    console.log(req.params.busname);
    return busExist; 
   };

   if(isbusExist){
    const resultData =await db.deleteOne({busName:req.params.busname});
   res.send(resultData);
   }else{
    res.send('no bus exist');
   }
    

})




app.listen(3000);
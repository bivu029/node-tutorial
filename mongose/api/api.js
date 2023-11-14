const express= require('express');
require('./config');
const BusModel= require('../bus_model');
const app= express();
app.use(express.json());


//post and add bus
app.post('/' ,async(req , res)=>{

    const result = await BusModel.find({busName:req.body.busName});
    const isbusExist= ()=>{
        const isresultNull= result.length==0?true:false
        return isresultNull; 
       }
   if(isbusExist()){
    const busdata= new BusModel(req.body);
    const resultData= await busdata.save();
    res.send(resultData);
   }else{
    res.send("bus name alredy exist please update or delete and try agin");
   }
  

 });

 //get and read data
app.get('/:busname' , async(req , res)=>{
    
    const getbus=await BusModel.find({});
    res.send(getbus);

});

//updata data
app.put('/:busname', async(req, res) => {
    const result = await BusModel.find({busName:req.params.busname});
    
    const isbusExist= ()=>{
        const isresultNull= result.length==0?false:true;
        //const busExist= !isresultNull? result[0]['busName']== req.params.busname? true:false:false;
        return isresultNull; 
       };

       if(isbusExist()){
       
        const myQuery= {busName:req.params.busname};
        const newvalues = { $set: {busName:req.body.busName==result[0].busName?result[0].busName:req.body.busName ,
                            busNumber:req.body.busNumber==result[0].busNumber?result[0].busNumber:req.body.busNumber,
                            publicTransport:req.body.publicTransport==result[0].publicTransport?result[0].publicTransport:req.body.publicTransport,
                            startFrom:req.body.startFrom==result[0].startFrom?result[0].startFrom:req.body.startFrom,
                            
                           }, 
                     };
      
        const update= await BusModel.updateOne(myQuery,newvalues);
       if(update.modifiedCount==0){
         res.send('No data change');
       }else{
        res.send(update);
       }

      }else{
        res.send("no such bus exist");
      }


    
});

//delete data by id params

app.delete('/:id',async (req, res) => {
   
    const result = await BusModel.find({_id:req.params.id});
    const isbusExist= ()=>{
        const isresultNull= result.length==0?false:true
        return isresultNull; 
       }

      if(isbusExist){
        const deletebus= await BusModel.deleteOne({_id:req.params.id});
        res.send(deletebus);
      }else{
        res.send("no such bus exist");
      }


});




app.listen(3000);
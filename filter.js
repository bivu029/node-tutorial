module.exports= requestFilter= (req,res,next)=>{
    if(!req.query.age){
     res.send("please enter age");
    }else if(req.query.age<18){
     res.send("u cant acces this page ");
    } else{
   
     next();
    }
 };
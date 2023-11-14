const express= require('express');
const multer  = require('multer');
const path= require('path');
require('../../config/config');

const app= express();

const storage= multer.diskStorage({
    destination:function(req,file,cb){
     
            cb(null,path.join(__dirname).toString())
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload= multer({
    storage:storage
}).single("user_filed");

app.post('/' ,upload, (req , res)=>{

   res.send('file uploaded')

});

app.listen(3000);
const mongoose = require('mongoose');
const  validator = require('validator');
const BusSchema= new mongoose.Schema({

    busName:{type:String,
             required:true,    //simple validation
             trim:true,
             validate(value){
                if(value.length<=3){
                    throw new Error("Enter valid bus name"); //custom validation
                }
            }
            },
    busNumber:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("Phone Number can not be negative"); //custom validation
            }
        }
    },
    status: {
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
        
    }, 
    publicTransport:Boolean,
    startFrom:String,
    allStation:[
                  {
                      station:{type:String,
                           //simple validation
                        trim:true,
                       },
                      time:{type:String,
                           //simple validation
                       },
                  }
               ],
    endStop:String,
    startTime:String,
    endTime:String,
    runAllDays:Boolean,
    isRunningToday:Boolean,
    runningDays:[
      {
          sunday:String,
          monday:String,
          tuesday:String,
          wednesday:String,
          thursday:String,
          friday:String,
          saturday:String,
      }
    ]
          
});
module.exports=BusSchema;
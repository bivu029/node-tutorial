const mongoose = require('mongoose');
const BusSchema= new mongoose.Schema({

    busName:String,
    busNumber:Number,
    publicTransport:Boolean,
    startFrom:String,
    allStation:[
                  {
                      station:String,
                      time:String,
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
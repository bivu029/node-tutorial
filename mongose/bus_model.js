const mongoose = require('mongoose');
const BusSchema= require('./bus_schema');

const BusModel= mongoose.model('buses',BusSchema);
const NoApproveBusModel= mongoose.model('noApproveBuses',BusSchema);
module.exports=BusModel;
const mongoose = require('mongoose');
const BusSchema= require('./bus_schema');

const BusModel= mongoose.model('user',BusSchema);
module.exports=BusModel;
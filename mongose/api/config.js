const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/userlist').then(() => console.log(' data base Connected!'));;
const url='mongodb+srv://bivu029:vQDdY2gh7zqiHvBC@cluster0.mf2rafv.mongodb.net/busdata?retryWrites=true&w=majority'
mongoose.connect(url,
    {
       // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
       // useFindAndModify:false
      }
    ).then(() => console.log(' data base Connected!')).catch((err)=>{
        console.log(err);
    });
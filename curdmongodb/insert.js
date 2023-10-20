const dataBaseConnection= require('../mongodb');
const data= require('../data');

const insert= async()=>{
const db= await dataBaseConnection();
const result= await db.insertMany([data]);
if(result.acknowledged){
    console.log('data has been inserted');
}
}
insert();
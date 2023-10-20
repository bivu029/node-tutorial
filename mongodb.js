const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dataBaseName="userlist";


async function getBusdatabase(){
    await client.connect();
     console.log('Connected successfully to server');
     const db = client.db(dataBaseName);
    return db.collection('user');  
 }
 module.exports= getBusdatabase;
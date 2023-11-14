const bcrypt = require('bcrypt');
const saltRounds = 10;

const generatePassHash= async({passsword}={})=>{

 bcrypt.hash(passsword,saltRounds,(err,hash)=>{

    if(err) console.log(err);
    console.log(hash);
 });
};

const checkPassword= ({hashPassword,passsword}={})=>{
    bcrypt.compare(passsword,hashPassword,(err,result)=>{
        if(err) console.log(err);
        console.log(result);
    })
}

generatePassHash({passsword:"bivy"});
checkPassword({hashPassword:"$2b$10$rqqX.LFdEgc8NyG5HeWE8uYCKN2gp4ehEYpRXyiEGznZC14V1zLY6",passsword:"bivy"});
var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'localhost',
  user:'root',
  password: 'root',
  database: "tut",
  
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    // con.query("select * from bus", function (err, result) {
    //     if (err) throw err;
    //   //  console.warn(result);
    //   });
  });
  module.exports= con;
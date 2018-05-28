var mysql = require('mysql');

var con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'aativa',
  database: 'shayer'
});

con.connect((error) => {
 if(error){
   console.log('Error connecting to db');
   return;
 }
   console.log('Successfully connected');
});

module.exports = {
  con
};

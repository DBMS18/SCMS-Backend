
const mysql = require('mysql2/promise');
 

  var pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbms2'
  });
  
  pool.getConnection(function(err, connection) {
    if (err){
      throw err;
    }
    console.log("DB connected");
  });

module.exports = pool;

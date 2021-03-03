const mysql = require('mysql2/promise');
 

  var pool  = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'newscms',
   
  });
  
  pool.getConnection(function(err, connection) {
    console.log('db');
    if (err){
      throw err;
    }
    console.log("DB connected");
  });

module.exports = pool;
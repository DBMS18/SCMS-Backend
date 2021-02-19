let mysql = require('mysql');


let connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'DHWpHlClHH',
    //port: 3306,
    password: 'S74xORBG4k',
    database: 'DHWpHlClHH'
});


connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;
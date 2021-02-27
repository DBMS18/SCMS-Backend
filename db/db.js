let mysql = require('mysql2/promise');


let connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'DHWpHlClHH',
    //port: 3306,
    password: 'S74xORBG4k',
    database: 'DHWpHlClHH'
});

module.exports = connection;
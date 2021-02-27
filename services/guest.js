var db = require('../db/db');
const bluebird = require('bluebird');
//let mysql = require('mysql');


class Guest{

    constructor(){}

    async createAccount(user){
        let response = "";
        console.log(user.email,user.password);
        try {
            connection.query('select count(*) as number_of_rows from customer where email=?', [user.email]); 
        } catch (error) {
            console.log('caught exception!', error);
        }
        
        console.log(rows);
        await db.query('select count(*) as number_of_rows from customer where email=?', [user.email], async function (err, result) {
            if (err) response = err;
            console.log(result);
            if (result[0]['number_of_rows'] < 1) {
                await db.query('INSERT INTO `customer`(`email`, `first_name`, `last_name`, `password`) VALUES (?,?,?,?)', [user.email, user.first_name, user.last_name, user.password], async function (err, result) {
                    if (err)
                        response = err;
    
                    if (result.affectedRows == 1) {
                        response = true;
                    }
                });
            } else {
                response = false;
            }
    
        });

        
        console.log(response);
        return response; 
    }

    async getUser(email){
        const querry = 'CALL login(?);';
        const out = await db.query(querry,[email]);
        return out;
    }
   

}

module.exports=Guest;

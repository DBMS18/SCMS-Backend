var db = require('../db/db');
//let mysql = require('mysql');


class Guest{

    async  createAccount(user){
        let response = "";
        console.log("a");
        await  db.query('select count(*) as number_of_rows from customer where email=?', [user.email], async function(err, result) {
            if (err) response = err;
            console.log("b");
            if(result[0]['number_of_rows']>0) {
                
                console.log("c");
                await db.query('INSERT INTO `customer`(`email`, `first_name`, `last_name`, `password`) VALUES (?,?,?,?)', [user.email,user.first_name,user.last_name,user.password], async function(err, result) {
                    if (err) response = err;
                    console.log("d");
                    if(result.affectedRows==1){
                        response = true;
                        console.log("e");
                        await db.end( async function(err) {
                            if (err) {
                               console.log('error:' + err.message);
                            }
                            await console.log('Close the database connection.');
                          });
                    }
                  });
                  console.log("f");
                  console.log(response);
                  
            }else{
                console.log("g");
                response = false;
            }
            console.log("h");
          });
          console.log("i");
          console.log(res);
          

        

          return response
            
    }

    async addUser(first_name,last_name,email,password){

       
    }
   

}

module.exports=Guest;

/// these are sample code 
/// use this style if you need


//---------------------------------------------------------------------//



// const sequelize=require('../config/database');
// const UserModel=require('../models/user-model');
// const {Op} = require("sequelize");
// const md5 = require('md5');


// class Guest{
    
//     constructor(){
//         try {
//             sequelize.authenticate();
//             console.log('Connection has been established successfully.');
//         } catch (error) {
//             console.error('Unable to connect to the database:', error);
//         }
//     }

//     async  createAccount(info) {
//         //check if the user had already created an account 
//         let guest_email = info[0].email;
//         let cnt = await UserModel.count({where: {
//             [Op.and]: [
//                 { email: guest_email },
//                 { is_deleted: 0 }
//         ]}});
    
//         if (cnt > 0) {
//             return false;

//         }else{
//             let guest_first_name = info[0].first_name;
//             let guest_last_name = info[0].last_name;
//             let guest_password = info[0].password;
            
    
//             //let result = new User();
//             await this.addUser(guest_first_name, guest_last_name,guest_email,guest_password);
//             return true;
         
//         }
            
//     }

//     async addUser(first_name,last_name,email,password){

//         let hashPassword = md5(password);
//         const newUser= await UserModel.create({
//             first_name: `${first_name}`,
//             last_name:`${last_name}`,
//             email: `${email}`,
//             password: `${hashPassword}`,
     
//     });
//     }
   

// }

// module.exports=Guest;

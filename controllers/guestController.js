let CustomerModel = require('../models/customer-model');
const Guest = require('../services/guest.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const e = require('express');
// const md5 = require('md5');

// Instantiate User:
let guest = new Guest();

const guestController  = {};

//guest functions
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

guestController.createAccount = async (req, res, next) => {
    try {
        const customer = new CustomerModel(null,req.body.nic,req.body.email,req.body.pwrd,req.body.firstname,req.body.lastname);
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(customer.password, salt, (err, hash) => {
              if(err) next(err);
              customer.password = hash;
              guest.createAccount(customer)
                .then(response => {
                  console.log("created : " + response)
                  if(response === true){
                    const response = {
                        err: 0,
                        obj: true,
                        msg: "User successfully registered"
                      }
                      return res.json(response);
                  }else if(response === false){
                      const response = {
                          err: 0,
                          obj: false,
                          msg: "User already exists"
                        }
                        return res.json(response);
                  }else{
                      const response = {
                          err: 1,
                          obj: {},
                          msg: "Something is wrong"
                        }
                        return res.json(response);
                  }
                });
            })
        });

    } catch (err) {
      next(err);
    }
  };

  guestController.login = async(req, res, next) => {
    try {
        const email = req.query.email; 
        const password = req.query.password; 
        // let user = {
        //   id:1,
        //   role:"customer",
        //   isAdmin:true
        // }
        // let response = {
        //   err: 0,
        //   obj: {
        //     token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IjEiLCJyb2xlIjoiZ3Vlc3QiLCJpYXQiOjM1MTY4MzkwMjJ9.7X9jBLUVCq5-lkl2K5YNYmXa5_vGDDFvIFsKY8nGltw',
        //     user: user
        // },
        //   msg: "Login Successful"}

      
        
        let user = await guest.getUser(email);
        
        console.log(user);
        if (user==null) {
          const response = {
            err: 1,
            obj: {},
            msg: "User does not exist"
          }
          console.log("user do not exist")
          return res.json(response);
        }else if(user.id>=0){
          bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch){
                  const response = {
                    err: 1,
                    obj: {},
                    msg: "Password is invalid"
                  }
                  console.log("invalid password")
                  return res.json(response);
                };
                
                jwt.sign(
                    {id: user.id},
                    config.get('jwtSecret'),
                    { expiresIn: 36000 },
                    (err, token) => {
                        if(err) next(err);
                        const response = {
                          err: 0,
                          obj: {
                            token: token,
                            user: user
                          },
                          msg: "User successfully logged in"
                        }
                        console.log("logged in :" + user)
                        return res.json(response);
                    }
                )
            });
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "Something is wrong"
          }
          console.log("somthing is wrong")
          return res.json(response);
        }
//         //validate password
//         //console.log(user[0]);
//         let pass = user[0][0].password;
//         //console.log(pass);
//         let passw = md5(password);
//         let usr = user[0][0];
//         /*bcrypt.compare(passw, pass)
//         .then(isMatch => {
//             if(!isMatch){
//                 const response = {
//                     err: 1,
//                     obj: {},
//                     msg: "Invalid password"
//                   }
//                   return res.json(response);
//             }
            
            
        // });
// */    if (pass===passw){
//           jwt.sign(
//             {id: usr.id},
//             config.get('jwtSecret'),
//             { expiresIn: 3600 },
//             (err, token) => {
//                 if(err) throw err;
//                 return res.json({
//                     token,
//                     user: user
//                 });
//             })
//             //console.log(usr.id);
//           }else{
//             const response = {
//               err: 1,
//               obj: {},
//               msg: "Invalid password"
//             }
//             return res.json(response);
//           }
      
    }catch (err) {
      next(err);
    }
  };


module.exports = guestController;

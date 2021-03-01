const GuestQueryDAO = require("../models/dao/guestQueryDAO");
const CustomerDAO = require('../models/dao/customerDAO');


class Guest{

    constructor(){}

    async createAccount(customer){
        try {
            var response = await CustomerDAO.createOneEntity(customer);
            if (response[0][0][0].email_exist==null && response[0][0][0].id>0) {
                return true;
            } else if (response[0][0][0].email_exist==customer.email) {
                return false;
            } else{
                return "";
            }
        } catch (error) {
            return "";
        }
    }

    async getUser(email){

        try {
            var response = await GuestQueryDAO.getUser(email);
            
            if (response[0][0].length==0) {
                return null;
            } else if (response[0][0][0].role_name == undefined) {
                var user = {
                    id: response[0][0][0].customer_id,
                    password: response[0][0][0].password,
                    email: response[0][0][0].email,
                    role_name: 'customer',
                    isAdmin:false
                }
                return user;
            } else{
                var user = {
                    id : response[0][0][0].id,
                    password : response[0][0][0].password,
                    email : response[0][0][0].email,
                    role_name : response[0][0][0].role_name,
                    isAdmin: true
                }
                return user;
            }

        } catch (error) {
            return undefined;
        }
        
    }
   

}

module.exports=Guest;

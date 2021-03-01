const db = require('../../db/db')


class CustomerDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(customer){
        const querry = 'CALL RegisterUser(?, ?, ?, ?, ?)';
        const out = await db.query(querry,[customer.first_name, customer.last_name, customer.email, customer.password, customer.nic]);
        return out;
    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
    static async getDestinationByCustomerId(customerId){
        //return addline1,addline2,city
    }
}

module.exports = CustomerDAO;
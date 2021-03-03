const db = require('../../db/db')

class OrderDutyRecordDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(orderId, dutyId){
        const query  = `INSERT INTO order_duty_record (order_id,duty_id) VALUES (?,?)`;
        await db.query(query,[orderId, dutyId]);
        
        return "added";
    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
}

module.exports = OrderDutyRecordDAO
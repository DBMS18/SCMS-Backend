const db = require('../../db/db')


class DriverAssistentDAO {

    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(assistantId){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }
    static async getNameById(assistantId){

    }
    static async getOrdersOnDuty(assistantId){
        const query = `SELECT * FROM ordersfordriverassistant WHERE user_id=${assistantId} and status='pending`;
        const out = await db.query(query);
        return out[0];
    }

    static async markOrderDelivering(order_id){
        console.log(order_id)
        //sql = update order status  Where order_id/customer_id
        const query  = `UPDATE orders SET status='delivered' WHERE order_id=${order_id}`;
        const out = await db.query(query);
        return out[0];
    }
}

module.exports = DriverAssistentDAO;
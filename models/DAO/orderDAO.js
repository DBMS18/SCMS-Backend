const db = require('../../db/db')
class OrderDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async createOneEntity(){

    }

 



    static async changeStateToAssigned(order_id){
        const query  = 'UPDATE orders SET status = `accepted` WHERE order_id = ?;';
        await db.query(query,[order_id]);
        console.log('Changed the state to assigned');
        return 'sucessfully changed the state';
    }
    static async changeStateToFree(order_id){
        const query  = 'UPDATE orders SET status = `created` WHERE order_id = ?;';
        await db.query(query,[order_id]);
        console.log('Changed the state to created');
        return 'sucessfully changed the state';
    }
    static async deleteOneEntity(){
        
    }

    static async changeOrderStatus(orderId,newState){
        // return success msg
    }

    static async getOrdersBefore(date){
        //return orders list
    }
    static async getPendingOrders(){
        let details = []
        //gets the all  from the database
        //execute query and create order and push then to list
        //order_id,date,total_amount,expected_date,city,trainsList
        const query  = `SELECT * FROM orders  WHERE status = 'created'`;
        const out = await db.query(query,[]);
        details = out.rows;
        return details;
    }
    static async getAssignedOrders(){
        const query  = `SELECT * FROM orders INNER JOIN train_order ON orders.Order_id=train_order.order_id;`;
        const out = await db.query(query,[]);
        details = out.rows;
        return details;
    }

}
module.exports =OrderDAO;
const db = require('../../db/db')
class OrderDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async getNewPaymentID(){
        const querry = 'select order_id from orders order by order_id DESC limit 1;';
        const out = await db.query(querry);
        return out[0][0].order_id;
    }

    static async createOneEntity(customer_id,payment_id,dateNow,status,total_amount,route_id){

    }

    static async readAllEntity(){
        
    }

    static async readOneEntity(orderId){
        
    }

    static async updateOneEntity(){
        
    }

    static async deleteOneEntity(){
        
    }

    static async changeOrderStatus(orderId,newState){
        const query  = `UPDATE order SET status = ? WHERE order_id = ? `;
        await db.query(query,[newState,orderId]);
        
        return  "mark success";
        // return success msg
    }

    static async getAllUnReceviedOrders(){
        // return "Assign to train" orders
    }
    static async markOrderDelivering(customer_id,order_id){
        //sql = update order status  Where order_id/customer_id
    }
    static async getOrderId(customer_id,payment_id,dateNow,status,total_amount){

    }
    static async getOrdersByCustomerId(customer_id){
        //get orders with status send for delivering and customer_id= ?1
    }
    static async getPendingOrders(){
        let details = []
        //gets the all  from the database
        //execute query and create order and push then to list
        //order_id,date,total_amount,expected_date,city,trainsList
        const query  = "SELECT * FROM `orders`  WHERE status = 'created'";
        const out = await db.query(query,[]);
        details = out.rows;
        return details;
    }
    static async changeStateToAssigned(order_id){
        const query  = 'UPDATE orders SET `status` = "accepted" WHERE order_id = ?;';
        await db.query(query,[order_id]);
        console.log('Changed the state to assigned');
        return 'sucessfully changed the state';
    }
    static async getAssignedOrders(){
        const query  = "SELECT * FROM `orders` INNER JOIN train_order ON orders.Order_id=train_order.order_id;";
        const out = await db.query(query,[]);
        details = out.rows;
        return details;
    }
    static async changeStateToFree(order_id){
        const query  = 'UPDATE orders SET `status` = "created" WHERE order_id = ?;';
        await db.query(query,[order_id]);
        console.log('Changed the state to created');
        return 'sucessfully changed the state';
    }
}

module.exports = OrderDAO;
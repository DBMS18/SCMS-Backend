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
        const query  = `UPDATE orders SET status = ? WHERE order_id = ? `;
        await db.query(query,[newState,orderId]);
        
        return  "mark success";
        // return success msg
    }

    static async getAllUnReceviedOrders(){
        // return "Assign to train" orders
    }
    static async markOrderDelivering(customer_id,order_id){
        console.log(order_id)
        //sql = update order status  Where order_id/customer_id
        const query  = `UPDATE orders SET status='delivered' WHERE order_id=${order_id} AND customer_id=${customer_id}`;
        const out = await db.query(query);
        return out[0];
    }
    static async getOrderId(customer_id,payment_id,dateNow,status,total_amount){

    }
    static async getOrdersByCustomerId(customer_id,status){
        //get orders with status send for delivering and customer_id= ?1
        let query=``;
        if (status==='created'){
            query=`SELECT * FROM orderdetails WHERE status='created' and customer_id=${customer_id}`;
        }else if(status==='accepted'){
            query=`SELECT * FROM orderdetails WHERE status='accepted' and customer_id=${customer_id}`;
        }else if(status==='sending'){
            query=`SELECT * FROM orderdetails WHERE status='sending' customer_id=${customer_id}`;
        }else if(status==='delivered'){
            query=`SELECT * FROM orderdetails WHERE status='delivered' customer_id=${customer_id}`;
        }else if(status==='received'){
            query=`SELECT * FROM orderdetails WHERE status='received' customer_id=${customer_id}`;
        }else{
            query=`SELECT * FROM orderdetails WHERE customer_id=${customer_id}`;
        }
        const out = await db.query(query);
        return out[0];
    }


    static async getPendingOrders(){
        const query  = "SELECT * FROM orders  WHERE `status` = 'created'";
        const out = await db.query(query,[]);
        
        return out[0];
    }
    static async changeStateToAssigned(order_id){
        const query  = 'UPDATE orders SET `status` = "accepted" WHERE order_id = ?;';
        await db.query(query,[order_id]);
        console.log('Changed the state to assigned');
        return 'sucessfully changed the state';
    }
    static async getAssignedOrders(){
        
        const query  = "SELECT * FROM orders INNER JOIN train_order ON orders.Order_id=train_order.order_id;";
        const out = await db.query(query,[]);
        
        return out[0];
    }
    static async changeStateToFree(order_id){
        const query  = 'UPDATE orders SET `status` = "created" WHERE order_id = ?;';
        await db.query(query,[order_id]);
        console.log('Changed the state to created');
        return 'sucessfully changed the state';
    }
}

module.exports = OrderDAO;
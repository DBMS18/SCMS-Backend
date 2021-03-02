const db = require('../../db/db')
class OrderDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
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

    static async getOrdersInStore(store_id){
        const query=`SELECT * FROM ordersbystore where store_id=${store_id}`;
        const out = await db.query(query);
        return out[0];
    }
    
    
}

module.exports = OrderDAO;
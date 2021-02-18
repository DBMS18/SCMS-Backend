
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
        //sql = update order status  Where order_id/customer_id
    }
    static async getOrderId(customer_id,payment_id,dateNow,status,total_amount){

    }
    static async getOrdersByCustomerId(customer_id){
        
    }
    
}

module.exports = OrderDAO;
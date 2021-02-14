
class OrderDAO{
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

    static async readOneEntity(){
        
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
}
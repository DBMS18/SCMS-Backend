
class QueryDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async getProductByOrderId(orderId){
        // join productOrder and product - return produtId/ name/order quantity
    }

    static async getRouteForOrdersByStore(store_id){
        //join order and router give route id/name where store_id = ?
    }

    static async getOrdersInMyStore(store_id,route_id){
        //join Right outer order and order_store give id, orderDate, receivedDate, totalAmount where storeId =? route=?
    }
    

  
}

module.exports = QueryDAO;







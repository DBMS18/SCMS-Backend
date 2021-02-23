const db = require('../../db/db')
class QueryDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async getProductByOrderId(orderId){
        // join productOrder and product - return produtId/ name/order quantity - where orderId
    }

    static async getRouteForOrdersByStore(store_id){
        //join order and router - return route id/name -  where store_id = ?
    }

    static async getOrdersInMyStore(store_id,route_id){
        //join Right outer order and order_store - return id, orderDate, receivedDate, totalAmount -  where storeId =? route=?
    }
    static async getAllRoutes(){
        //join route and city - return routeid/cityid/cityname
    }

    static async getStoreId(user_id){

        //join user ,storekeeper,role table - return storeid  -where userid=?1
    }
    
    

    
    static async mockTest(user_id){

        const query  = `SELECT * FROM customer WHERE customer_id = ? `;
        const out = await db.query(query,[user_id]);
        console.log(out[0]);
        return out[0];
    }
    
  
}

module.exports = QueryDAO;







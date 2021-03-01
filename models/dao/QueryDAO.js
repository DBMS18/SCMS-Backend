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
        const query  = `SELECT route_id,route_name FROM route WHERE store_id = ? `;
        const out = await db.query(query,[user_id]);
        console.log(out[0]);
        return out[0];
        //join order and router - return route id/name -  where store_id = ?
    }

    static async getOrdersInMyStore(store_id,route_id){
        const query  = `SELECT order_id,date,store_date,total_capacity FROM order_store LEFT OUTER JOIN order USING (order_id) WHERE store_id = ? AND route_id = ? AND status ="Recevied To Store"`;
        const out = await db.query(query,[store_id,route_id]);
        console.log(out[0]);
        return out[0];
        //join Right outer order and order_store - return id, orderDate, receivedDate, totalAmount -  where storeId =? route=?
    }
    static async getAllRoutes(){
        //join route and city - return routeid/cityid/cityname
    }

    static async getStoreId(user_id){
        const query  = `SELECT store_id FROM storekeeper WHERE user_id = ? `;
        const out = await db.query(query,[user_id]);
        console.log(out[0]);
        return out[0];
        //storekeeper is view
    }
    static async getMyStoreSetOff(store_id){
        const query  = `SELECT truck_number,duty_id FROM duty_record WHERE store_id = ? AND status = "set-off" `;
        const out = await db.query(query,[store_id]);
        console.log(out[0]);
        return out[0];
        
    }
    static async changeOtherEmployeeStatus(store_id,dateNow){
        const query  = `CALL state_change(?,?)`;
        const out = await db.query(query,[store_id,dateNow]);
        console.log(out[0]);
        return out[0];
    }
    
    

    
    static async mockTest(user_id){

        const query  = `SELECT * FROM customer WHERE customer_id = ? `;
        const out = await db.query(query,[user_id]);
        console.log(out[0]);
        return out[0];
    }
    
  
}

module.exports = QueryDAO;







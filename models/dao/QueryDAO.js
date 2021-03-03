const db = require('../../db/db')
class QueryDAO{
    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async getProductByOrderId(orderId){
        const query  = `SELECT product_id,product_name,ordered_quantity FROM proudct_order LEFT OUTER JOIN product using (product_id) WHERE order_id = ? `;
        const out = await db.query(query,[orderId]);
        
        return out[0];
    }

    static async getRouteForOrdersByStore(store_id){

        const query  = `SELECT distinct(route_id),route_name FROM (order_store left outer join orders using (order_id)) left outer join route using (route_id) WHERE order_store.store_id = ? AND status ="stored";`;
        const out = await db.query(query,[store_id]);
        return out[0];
        //join order and router - return route id/name -  where store_id = ?
    }

    static async getOrdersInMyStore(store_id,route_id){
        const query  = `SELECT order_id,date,store_date,total_capacity FROM order_store LEFT OUTER JOIN order USING (order_id) WHERE store_id = ? AND route_id = ? AND status ="stored"`;
        const out = await db.query(query,[store_id,route_id]);
        return out[0];
        //join Right outer order and order_store - return id, orderDate, receivedDate, totalAmount -  where storeId =? route=?
    }
    static async getAllRoutes(){
        var routes = [];
        const query1  = `select route_id from route`;
        const out1 = await db.query(query1);

        for (const element of out1[0]) {
            const route_id = element.route_id
            const query2  = `select city_name from city where route_id=?`;
            const out2 = await db.query(query2,[route_id]);
            var cities = '';
            for (const city of out2[0]) {
                cities = [...cities, city.city_name]
            }
            const route = {
                route_id:route_id,
                cities:cities.join(" - ")
            }
            routes = [...routes, route]
        }
        return routes;
    }

    static async getStoreId(user_id){
        const query  = `SELECT store_id FROM storekeeper WHERE user_id = ? `;
        const out = await db.query(query,[user_id]);
        return out[0][0];
        //storekeeper is view
    }
    
    static async changeOtherEmployeeStatus(store_id,dateNow){
        const query  = `CALL state_change(?,?)`;
        const out = await db.query(query,[store_id,dateNow]);
        return out[0];
    }
    
    static async getMyStoreSetOff(store_id){
        const query  = `SELECT truck_number,duty_id FROM duty_record WHERE store_id = ? AND status = "set-off" `;
        const out = await db.query(query,[store_id]);
        
        return out[0];
        
    }

    
    static async mockTest(user_id){

        const query  = `SELECT * FROM customer WHERE customer_id = ? `;
        const out = await db.query(query,[user_id]);
        
        return out[0];
    }
    
  
}

module.exports = QueryDAO;






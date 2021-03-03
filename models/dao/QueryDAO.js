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
        const out = await db.query(query,[store_id]);
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

    
    
    static async changeOtherEmployeeStatus(store_id,dateNow){
        const query  = `CALL state_change(?,?)`;
        const out = await db.query(query,[store_id,dateNow]);
        console.log(out[0]);
        return out[0];
    }
    
    static async getMyStoreSetOff(store_id){
        const query  = `SELECT truck_number,duty_id FROM duty_record WHERE store_id = ? AND status = "set-off" `;
        const out = await db.query(query,[store_id]);
        console.log(out[0]);
        return out[0];
        
    }

    
    static async mockTest(user_id){

        const query  = `SELECT * FROM customer WHERE customer_id = ? `;
        const out = await db.query(query,[user_id]);
        console.log(out[0]);
        return out[0];
    }
    //tharinda
    //from store keeper id this will return all orders which will received to store
    static async getAcceptedOrdersByStorekeeperId(user_id){
        var acceptedOrders=[];
        const query =`SELECT order_id,total_amount,first_name,expected_date FROM orders,customer WHERE orders.customer_id=customer.customer_id AND status="accepted" AND address_id IN(select address_id from address where city IN(select city FROM store where store_id IN(select store_id FROM users where user_id=?)))`;
        const out=await db.query(query,[user_id]);
        for (const element of out[0]){
            const order_id=element.order_id;
            const total_amount=element.total_amount;
            const first_name=element.first_name;
            const expected_date=element.expected_date;
            
            const acceptedOrder={
                order_id:order_id,
                first_name:first_name,
                total_amount:total_amount,
                expected_date:expected_date
            }
            acceptedOrders=[...acceptedOrders,acceptedOrder]
        }
        return acceptedOrders;
    }
    //tharinda
    static async getStoredOrdersByStorekeeperId(user_id){
        var storedOrders=[];
        const query =`SELECT order_id,total_amount,first_name,expected_date FROM orders,customer WHERE orders.customer_id=customer.customer_id AND status="stored" AND address_id IN(select address_id from address where city IN(select city FROM store where store_id IN(select store_id FROM users where user_id=?)))`;
        const out=await db.query(query,[user_id]);
        for (const element of out[0]){
            const order_id=element.order_id;
            const total_amount=element.total_amount;
            const first_name=element.first_name;
            const expected_date=element.expected_date;
            const storedOrder={
                order_id:order_id,
                first_name:first_name,
                total_amount:total_amount,
                expected_date:expected_date
            }
            storedOrders=[...storedOrders,storedOrder]
        }
        return storedOrders;
    }
    //tharinda
    static async markOrderReceivedToStore(order_id){
        const query=`update orders set status="stored" where order_id=?`;
        await db.query(query,[order_id]);
    }
    //tharinda
    static async getStorekeeperNameAndStoreLocation(user_id){
        
        const query =`select first_name,last_name,city from users,store where store.store_id=users.store_id AND user_id=?`;
        const out=await db.query(query,[user_id]);
        if (out[0][0]!=undefined){
        const first_name=out[0][0].first_name;
        const last_name=out[0][0].last_name;
        const city=out[0][0].city;
        const loginInfo={
                first_name:first_name,
                last_name:last_name,
                city:city
            }
        
        return loginInfo;
        }else{
            return null;
        }

    }
    //tharinda
    static async getStoreId(user_id){
        const query  = `SELECT store_id FROM users WHERE user_id = ? `;
        const out = await db.query(query,[user_id]);
        
        return out[0][0].store_id;
        
    }
    

    //report generation(items with most orders)
    static async getItemsWithMostOrders(){
        var mostOrderList=[]
        const query =`SELECT product_id,type,sum(ordered_quantity) as total_order from product RIGHT OUTER JOIN product_order using (product_id) GROUP BY product_id ORDER BY sum(ordered_quantity) DESC`;
        const out=await db.query(query);
        for (const element of out[0]){
            const product_id=element.product_id;
            const type=element.type;
            const total_order=element.total_order;
            const order={
                product_id:product_id,
                type:type,
                total_order:total_order
            }
            mostOrderList=[...mostOrderList,order]
        }
        
        return mostOrderList;
    }
   
  
}

module.exports = QueryDAO;







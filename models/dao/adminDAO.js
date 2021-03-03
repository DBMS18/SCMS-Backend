const db = require('../../db/db')

class AdminDAO{
    constructor(){
            try {
                //connect with db            
            } catch (error) {
                
            }
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

    static async getCustomerOrderReport(){
        var customerOrderList=[]
        const query =`SELECT customer.customer_id,customer.first_name,customer.last_name,orders.order_id,payment.paid_amount,orders.date as ordered_date,product_order.ordered_quantity,product.type from (((orders LEFT OUTER JOIN payment USING (payment_id) )LEFT OUTER JOIN customer USING (customer_id)) LEFT OUTER JOIN product_order USING (order_id)) LEFT OUTER JOIN product USING (product_id) ORDER BY customer.customer_id ,payment.paid_amount ASC`;
        const out=await db.query(query);
        for (const element of out[0]){
            
            const customer_id=element.customer_id;
            const first_name=element.first_name;
            const last_name=element.last_name;
            const order_id=element.order_id;
            const paid_amount=element.paid_amount;
            const ordered_date=element.ordered_date;
            const ordered_quantity=element.ordered_quantity;
            const type=element.type;
            const customerOrder={
                customer_id:customer_id,
                first_name:first_name,
                last_name:last_name,
                order_id:order_id,
                paid_amount:paid_amount,
                ordered_date:ordered_date,
                ordered_quantity:ordered_quantity,
                type:type
            }
            
            customerOrderList=[...customerOrderList,customerOrder]
        }
        
        return customerOrderList;
    }
   // Sales report categorized according to main cities and routes
    static async getSalesReport(){
        var salesReportList=[]
        const query =`SELECT store.city,orders.order_id,orders.total_amount,route.route_id,route.route_name,route.store_id,SUM(payment.paid_amount) as total_sale from ((orders LEFT OUTER JOIN payment USING (payment_id) )LEFT OUTER JOIN route USING (route_id)) LEFT OUTER JOIN store USING (store_id) GROUP BY route.route_name ORDER BY store.city  ASC`;
        const out=await db.query(query);
        for (const element of out[0]){
            
            const city=element.city;
            const total_amount=element.total_amount;
            const route_name=element.route_name;
            const total_sale=element.total_sale;
            const sales={
                city:city,
                total_amount:total_amount,
                route_name:route_name,
                total_sale:total_sale,
            }
            
            salesReportList=[...salesReportList,sales]
        }
        
        return salesReportList;
    }
    //Working Hours of Drivers/ Driver Assistants and Used hours of Trucks
    static async getWorkingHoursDrivers(start,curr){
        var diversWorkingHourList=[]
        const query =`SELECT driver_id as user_id,first_name as driver_name,SUM(time) as worked_hours FROM (duty_record join route using (route_id)) left outer join users on users.user_id = duty_record.driver_id WHERE duty_record.date > ? AND duty_record.date <= ? AND duty_record.status = "arrived" GROUP BY duty_record.driver_id`;
        const out=await db.query(query,[start,curr]);
        for (const element of out[0]){
            
            const driver_name=element.driver_name;
            const worked_hours=element.worked_hours;
            
            const diversWorkingHour={
                driver_name:driver_name,
                worked_hours:worked_hours
            }
            
            diversWorkingHourList=[...diversWorkingHourList,diversWorkingHour]
        }
        
        return diversWorkingHourList;
    }

    static async getWorkingHoursAssistant(start,curr){
        var assistantWorkingHourList=[]
        const query =`SELECT assistant_id as user_id,first_name as assistant_name,SUM(time) as worked_hours FROM (duty_record join route using (route_id)) left outer join users on users.user_id = duty_record.assistant_id WHERE duty_record.date > ? AND duty_record.date <= ? AND duty_record.status = "arrived" GROUP BY duty_record.assistant_id`;
        const out=await db.query(query,[start,curr]);
        for (const element of out[0]){
            
            const assistant_name=element.assistant_name;
            const worked_hours=element.worked_hours;
            
            const assistantWorkingHour={
                assistant_name:assistant_name,
                worked_hours:worked_hours
            }
            
            assistantWorkingHourList=[...assistantWorkingHourList,assistantWorkingHour]
        }
        
        return assistantWorkingHourList;
    }

    static async getWorkingHoursTruck(start,curr){
        var truckWorkingHourList=[]
        const query =`SELECT truck_number,SUM(time) as worked_hours FROM (duty_record join route using (route_id)) left outer join truck using (truck_number) WHERE duty_record.date > '2021-03-01' AND duty_record.date <= '2022-12-12' AND duty_record.status = "arrived" GROUP BY duty_record.truck_number`;
        const out=await db.query(query,[start,curr]);
        for (const element of out[0]){
            
            const truck_number=element.truck_number;
            const worked_hours=element.worked_hours;
            
            const truckWorkingHour={
                truck_number:truck_number,
                worked_hours:worked_hours
            }
            
            truckWorkingHourList=[...truckWorkingHourList,truckWorkingHour]
        }
        
        return truckWorkingHourList;
    }

    static async getQuaterlySalesReport(){
        var quarterlySalesReportList=[]
        const query =`select product.product_id,product.price as unit_price,product.type,COUNT(product_order.order_id) as total_orders,SUM(product_order.ordered_quantity) as total_ordered_quantity , (product.price * SUM(product_order.ordered_quantity)) as total_sale FROM product LEFT OUTER JOIN product_order ON product.product_id=product_order.product_id LEFT OUTER JOIN orders ON product_order.order_id=orders.order_id WHERE (orders.date<= '2021-05-01' AND orders.date>='2021-01-01') GROUP BY product.product_id ORDER BY product.product_id`;
        const out=await db.query(query);
        for (const element of out[0]){
            
            const unit_price=element.unit_price;
            const type=element.type;
            const total_orders=element.total_orders;
            const total_ordered_quantity=element.total_ordered_quantity;
            const total_sale=element.total_sale;
            const quarterlySalesReport={
                unit_price:unit_price,
                type:type,
                total_orders:total_orders,
                total_ordered_quantity:total_ordered_quantity,
                total_sale:total_sale,
            }
            
            quarterlySalesReportList=[...quarterlySalesReportList,quarterlySalesReport]
        }
        
        return quarterlySalesReportList;
    }



}
module.exports =AdminDAO;
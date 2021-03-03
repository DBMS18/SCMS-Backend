const { query } = require('../../db/db');
const db = require('../../db/db')
class CustomerQueryDAO{

    constructor(){
        try {
            //connect with db            
        } catch (error) {
            
        }
    }

    static async getUser(email){
        const querry = 'CALL login(?);';
        const out = await db.query(querry,[email]);
        return out;
    }

    static async createOrder(today,paid_amount,payment_method,customer_id,total_amount,street_number,street_name,city,zip,expected_date,route_id,products,paymentId,orderId){
        try {
            console.log("DAO started")
            await db.query("start transaction;");
console.log("transaction started")            
            const pay = await db.query("INSERT INTO `payment`(`payment_id`,`date`, `time`, `payment_method`, `paid_amount`) VALUES (?,?,CURRENT_TIME,?,?);",[paymentId,today,payment_method,paid_amount])
            if (pay[0].affectedRows!=1) {
                console.log("roll")
                await db.query("ROLLBACK;");
                return {err:1, code:1};
            }

console.log("payment done : " + pay[0].affectedRows)
            var street_id = await db.query('select street_id from street order by street_id DESC limit 1;')
            street_id = street_id[0][0].street_id + 1;
console.log(street_id)            
            const street = await db.query("INSERT INTO `street`(`street_id`,`street_number`, `street_name`) VALUES (?,?,?);",[street_id,street_number,street_name]);              
            var address_id = 0;
            if (street[0].affectedRows!=1) {
                await db.query("ROLLBACK;");
                return {err:1, code:2};
            }else if(street[0].affectedRows==1){
                var as = await db.query("select street_id,street_number from street order by street_id DESC limit 1;");
                console.log(as[0][0].street_id, as[0][0].street_number)
console.log("street done ", street_id)                                
                const address = await db.query("INSERT INTO `address`(`city`, `zip`, `street_id`) VALUES (?,?,?);",[city,zip,street_id]);
                address_id = await db.query("select address_id as id, city from address order by address_id DESC limit 1;");
console.log(address_id[0][0].city)
                address_id = address_id[0][0].id;
console.log("address doen : " , address_id)             
                if (address[0].affectedRows!=1) {
                    await db.query("ROLLBACK;");
                    return {err:1, code:2};
                }
            }else{
                await db.query("ROLLBACK;");
                return {err:1, code:10};
            }
console.log("address added")
            const order = await db.query("INSERT INTO `orders`(`order_id`, `status`, `date`, `total_amount`, `payment_id`, `customer_id`, `address_id`, `expected_date`, `route_id`) VALUES (?,?,?,?,?,?,?,?,?);",[orderId,"setoff",today,total_amount,paymentId,customer_id,address_id,expected_date,route_id]);
            if (order[0].affectedRows!=1) {
                await db.query("ROLLBACK;");
                return {err:1, code:3};
            }
            var o_id = await db.query("select order_id as id from orders order by order_id DESC limit 1;");
            o_id = o_id[0][0].id;
console.log("order added : " , o_id)
            if (o_id!=orderId) {
                await db.query("ROLLBACK;");
                return {err:1, code:3};
            }
console.log("order passed")
            var result = [];
            var rolleback = false;

            for (const product of products) {
                const p = await db.query("select product_id, amount from product where amount>=? and product_id=?;",[product.ordered_quantity,product.product_id])
                var pro = {}
                if (p[0][0]===undefined) {
                    pro = {
                        product_id:product.product_id,
                        available:false,
                        type:product.type
                    }
                    rolleback = true;
                }else{
                    pro = {
                        product_id:product.product_id,
                        type:product.type,
                        available:true,
                    }
                    const remaining_amount = p[0][0].amount-product.ordered_quantity;
                    await db.query("update product set amount = ? where product_id=?;",[remaining_amount,product.product_id]);
                    await db.query("INSERT INTO `product_order`(`order_id`, `product_id`, `ordered_quantity`, `total_capacity`) VALUES (?,?,?,?);",[orderId,product.product_id,product.ordered_quantity, product.total_capacity]);
                }
console.log("Products : " ,  pro)
                result = [...result, pro];
            }
            if (rolleback) {
                console.log("result")
                await db.query("ROLLBACK;");
                return {err:1, code:4, products:result};
            }
console.log("finished")
            await db.query("commit");

            return {err:0, code:0};
    
        } catch (error) {
console.log("catch : " + error)            
            await db.query("ROLLBACK;");
            return error;
        }
    }
}

module.exports = CustomerQueryDAO;
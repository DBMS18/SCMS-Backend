
const RouteDAO = require("../models/dao/routeDAO.js");
const PaymentDAO = require("../models/dao/paymentDAO.js");
const ProductDAO = require("../models/dao/productDAO.js");
const OrderDAO = require("../models/dao/orderDAO.js");
const ProductOrderDAO = require("../models/dao/orderDAO.js");
const QueryDAO = require("../models/dao/QueryDAO.js");
class CustomerService {
    constructor() {

    }

    async getProductList() { 
        try {
            var productList = await ProductDAO.readAllEntity();

            return productList;

        } catch (error) {

        }

    }


    //get route list -ok
    async getRouteList() {
        try {

            var routes = await QueryDAO.getAllRoutes();
        

            return routes;
            //    [
            //        {
            //            route_id:1,
            //            city_id:2,
            //            city_name: Panadura
            //        },
            //             ..........
            //    ]

        } catch (error) {

        }

    }


    //------front end handle cart-------

    
    //---------------------------Checkout process-------------------------
    async checkOutMyCart(paid_amount, customer_id, item_list, route_id) {
        //other way - can make procedure/transaction to update all table
        try {

            var paymentId = this.makeOneTimePayment(paid_amount);
            if (paymentId != null) {
                var total_amount = item_list.length;
                var order_id = this.createNewOrder(customer_id, total_amount, paymentId, route_id);
                if (order_id != null) {
                    let result = this.markProductsInOrder(order_id, item_list);

                    return result;
                }
                else {
                    return "Paymet success.Order Failed";
                }
            }
            else {
                return "Payment Failed";
            }

        } catch (error) {

        }

    }

    async makeOneTimePayment(paid_amount) {
        try {
            var payment_method = "online";

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;

            var timeNow = "10:10:00" //get current time



            await PaymentDAO.makeOneTimePayment(paid_amount, payment_method, dateNow, timeNow);
            payment_id = await PaymentDAO.getPaymentId(paid_amount, payment_method, dateNow, timeNow);


            return payment_id;


        } catch (error) {

        }

    }

    async createNewOrder(customer_id, total_amount, payment_id, route_id) {
        try {
            var status = "Order Created";

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;



            await OrderDAO.createOneEntity(customer_id, payment_id, dateNow, status, total_amount, route_id);
            order_id = await OrderDAO.getOrderId(customer_id, payment_id, dateNow, status, total_amount);


            return order_id;


        } catch (error) {

        }

    }

    async markProductsInOrder(order_id, item_list) {
        try {
            for (let i = 0; i < item_list.length; i++) {
                var product = item_list[i];
                let product_id = product.product_id;
                let ordered_quantity = product.ordered_quantity;
                await ProductOrderDAO.createOneEntity(order_id, product_id, ordered_quantity);
                this.updateProductAvailableQuantity(product_id, ordered_quantity)
            }

            return "Order Created Success";


        } catch (error) {

        }

    }

    async updateProductAvailableQuantity(product_id, ordered_quantity) {
        try {
            var previousAmount = await ProductDAO.getAmountById(product_id);
            var newAmount = previousAmount - ordered_quantity;
            await ProductDAO.changeAmountById(product_id, newAmount);

        } catch (error) {

        }

    }

    //-----------------------Confirm order----------------------

    async getMyOrderList(customer_id,status) {
        try {
            var orders= await OrderDAO.getOrdersofCustomer(customer_id);


            
            //order_list=order_list[0];
            var myOrders = [];
            for (let i = 0; i < orders.length; i++) {
                var order = orders[i];
                
                let order_id = order.order_id;
                let date = order.date;
                let status = order.status;
                let total_amount=order.total_amount;

                //var payment = await PaymentDAO.readOneEntity(payment_id);
                var product=[];
                var product_list = await OrderDAO.getProductsByOrderID(order_id);
                for(let j in product_list){
                    product.push(product_list[j].name)
                }

                var OneOrder = { order_id, date, status, total_amount,product }
                myOrders.push(OneOrder);
            }

            return myOrders;
            //    [
            //        {
            //            order_id:1,
            //            date:2020-12-12,
            //            total_capacity: 50,
            //            payment: {
            //                payment_id:2,
            //                payment_method = online,
            //                paid_amount :200,
            //                date:2020-10-02
            //                time:10:30:30
            //            },
            //            status: Send to Delivery,
            //            product_list:[
            //                {
            //                 product_id:2
            //                 name:Shampoo,
            //                 ordered_quantity: 10
            //                },
            //                     ..........
            //            ]
            //        },
            //             ..........
            //    ]
        } catch (error) {
            console.log(error)

        }

    }

    async markOrderDelivering(customer_id, order_id) {
        try {
            var response = await OrderDAO.markOrderDelivering(customer_id, order_id);
            if (response != null) {
                return false
            }
            return true;


        } catch (error) {

        }

    }


}

module.exports = CustomerService;
cus=new CustomerService();
cus.getMyOrderList(2,"All").then(result=>console.log(result))

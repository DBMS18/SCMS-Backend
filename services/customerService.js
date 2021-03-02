
const RouteDAO = require("../models/dao/routeDAO.js");
const PaymentDAO = require("../models/dao/paymentDAO.js");
const ProductDAO = require("../models/dao/productDAO.js");
const OrderDAO = require("../models/dao/orderDAO.js");
const ProductOrderDAO = require("../models/dao/orderDAO.js");
const QueryDAO = require("../models/dao/QueryDAO.js");
const CustomerQuerryDAO = require("../models/dao/customerQuerryDAO");

class CustomerService {
    constructor() {

    }

    async getProductList(keyword) { 
        try {
            var productList = await ProductDAO.readAllEntity(keyword);

            return productList;

        } catch (error) {

        }

    }


    //get route list -ok
    async getRouteList() {
        try {
            var routes = await QueryDAO.getAllRoutes();
            console.log(routes)
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
            return error
        }

    }


    //------front end handle cart-------

    
    //---------------------------Checkout process-------------------------
    async checkOutMyCart(today,paid_amount,payment_method,customer_id,total_amount,street_number,street_name,city,zip,expected_date,route_id,products) {
        //other way - can make procedure/transaction to update all table
        try {
            console.log("object")
            var paymentId = await PaymentDAO.getNewPaymentID();
            var orderId =await  OrderDAO.getNewPaymentID();
            console.log("payment")
            console.log(paymentId+1)
            console.log(today)
            console.log("time")
            console.log(payment_method)
            console.log(paid_amount)

            console.log("orders")
            console.log(orderId+1)
            console.log("created")
            console.log(today)
            console.log(total_amount)
            console.log(paymentId+1)
            console.log(customer_id)
            console.log("street")
            console.log(street_name)
            console.log(street_number)
            console.log("street_id")
            console.log("address")
            console.log(city)
            console.log(zip)
            console.log(expected_date)
            console.log(route_id)
            console.log(products)

        } catch (error) {

        }

    }

    // async makeOneTimePayment(paid_amount) {
    //     try {
    //         var payment_method = "online";

    //         var today = new Date()
    //         var dd = String(today.getDate()).padStart(2, '0');
    //         var mm = String(today.getMonth() + 1).padStart(2, '0');
    //         var yyyy = today.getFullYear();
    //         var dateNow = yyyy + '-' + mm + '-' + dd;

    //         var timeNow = "10:10:00" //get current time



    //         await PaymentDAO.makeOneTimePayment(paid_amount, payment_method, dateNow, timeNow);
    //         payment_id = await PaymentDAO.getPaymentId(paid_amount, payment_method, dateNow, timeNow);


    //         return payment_id;


    //     } catch (error) {

    //     }

    // }

    // async createNewOrder(customer_id, total_amount, payment_id, route_id) {
    //     try {
    //         var status = "Order Created";

    //         var today = new Date()
    //         var dd = String(today.getDate()).padStart(2, '0');
    //         var mm = String(today.getMonth() + 1).padStart(2, '0');
    //         var yyyy = today.getFullYear();
    //         var dateNow = yyyy + '-' + mm + '-' + dd;



    //         await OrderDAO.createOneEntity(customer_id, payment_id, dateNow, status, total_amount, route_id);
    //         order_id = await OrderDAO.getOrderId(customer_id, payment_id, dateNow, status, total_amount);


    //         return order_id;


    //     } catch (error) {

    //     }

    // }

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

    async getMyOrderList(customer_id) {
        try {
            
            var order_list = await OrderDAO.getOrdersByCustomerId(customer_id);
            var myOrders = [];
            for (let i = 0; i < order_list.length; i++) {
                var order = order_list[i];
                
                let order_id = order.order_id;
                let date = order.date;
                let total_capacity = order.total_capacity;
                let status = order.status;
                let payment_id = order.payment_id


                var payment = await PaymentDAO.readOneEntity(payment_id);
 

                var product_list = await QueryDAO.getProductByOrderId(order_id);
   

                var OneOrder = { order_id, date, total_capacity, payment, status, product_list }
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

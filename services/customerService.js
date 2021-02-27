
const RouteDAO = require("../models/dao/routeDAO.js");
const PaymentDAO = require("../models/dao/paymentDAO.js");
const ProductDAO = require("../models/dao/productDAO.js");
const OrderDAO = require("../models/dao/orderDAO.js");
const ProductOrderDAO = require("../models/dao/orderDAO.js");
const QueryDAO = require("../models/dao/QueryDAO.js");
class CustomerService {
    constructor() {

    }

    //get product list -ok
    async getProductList() { 
        try {
            var productList = await ProductDAO.readAllEntity();


            return productList;
            //    [
            //        {
            //            product_id:1,
            //            type: Shampoo,
            //            discription: good product for anyone,
            //            amount: 23,
            //            price:23
            //        },
            //             ..........
            //    ]

        } catch (error) {

        }

    }


    //get route list -ok
    async getRouteList() {
        try {

            var routetList = []
            var routes = await RouteDAO.readAllEntity();
            routes.forEach(route => {
                let routeId = route.routeId;
                let discription = route.discription;
                var OneRoute = { routeId, discription };
                routetList.push(OneRoute);
            });

            return routetList;
            //    [
            //        {
            //            route_id:1,
            //            discription: Colombo,panadura
            //        },
            //             ..........
            //    ]

        } catch (error) {

        }

    }


    //------front end handle cart-------


    async checkOutMyCart(paid_amount, customer_id, item_list, route_id) {
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
            item_list.forEach(async (product) => {
                let product_id = product.product_id;
                let ordered_quantity = product.ordered_quantity;
                await ProductOrderDAO.createOneEntity(order_id, product_id, ordered_quantity);
                this.updateProductAvailableQuantity(product_id, ordered_quantity)
            });

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

    async getMyOrderList(customer_id) {
        try {
            var order_list = await OrderDAO.getOrdersByCustomerId(customer_id);
            var myOrders = [];
            order_list.forEach(async (order) => {
                let id = order.orderId;
                let date = order.date;
                let total_amount = order.totalAmount;
                let status = order.status;
                let paymentId = order.orderId

                let productList = []

                var payment = await PaymentDAO.readOneEntity(paymentId);
                let paid_amount = payment.amount;

                var product_list = await QueryDAO.getProductByOrderId(id);
                // productJsonList.forEach(product => {
                //     let productName = await ProductDAO.getProductById(product.productId);
                //     let orderedQuantity = product.quantity
                //     var OneProduct = { productName, orderedQuantity }
                //     productList.push(OneProduct);
                // });

                var OneOrder = { id, date, total_amount, paid_amount, status, product_list }
                myOrders.push(OneOrder);

            });

            return myOrders;
            //    [
            //        {
            //            id:1,
            //            date:2020-12-12,
            //            total_amount: 5,
            //            paid_amount: 300,
            //            status: Send to Delivery,
            //            product_list:[
            //                {
            //                 productName:Shampoo,
            //                 orderedQuantity: 10
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

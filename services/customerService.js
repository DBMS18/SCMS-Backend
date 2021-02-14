
const RouteDAO = require("../models/dao/routeDAO.js");
const OrderStoreDAO = require("../models/dao/order_storeDAO.js");

class CustomerService{
    constructor(){
        
    }

    //get product list
    async getProductList(){
        try {
           var productList = await ProductDAO.readAllEntity();
           
          
           return productList;
        //    [
        //        {
        //            product_id:1,
        //            type: Shampoo,
        //            Discription: good product for anyone,
        //            amount: 23
        //        },
        //             ..........
        //    ]
                      
        } catch (error) {
            
        }
        
    }

    


    //------front end handle cart-------


    async checkOutMyCart(paid_amount,customer_id,item_list){
        try {
        
            var paymentId = makeOneTimePayment(paid_amount);
            if(paymentId != null){
                var order_id = createNewOrder(customer_id,item_list,paymentId);
                if(order_id != null){
                   let result =  markProductsInOrder(order_id,item_list);

                   return result;
                }
                else{
                    return "Paymet success.Order Failed";
                }
            }
            else{
                return "Payment Failed";
            }                  
                      
        } catch (error) {
            
        }
        
    }

    async makeOneTimePayment(paid_amount){
        try {
            var payment_method = "online";

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;

            var timeNow = "10:10:00" //get current time



            await PaymentDAO.makeOneTimePayment(paid_amount,payment_method,dateNow,timeNow);
            payment_id = await PaymentDAO.getPaymentId(paid_amount,payment_method,dateNow,timeNow);
           
          
           return payment_id;
       
                      
        } catch (error) {
            
        }
        
    }

    async createNewOrder(customer_id,item_list,payment_id){
        try {
            var status = "Order Created";

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;

            var total_amount = item_list.length;

            await OrderDAO.createOneEntity(customer_id,payment_id,dateNow,status,total_amount);
            order_id = await OrderDAO.getOrderId(customer_id,payment_id,dateNow,status,total_amount);;
           
          
            return order_id;
       
                      
        } catch (error) {
            
        }
        
    }

    async markProductsInOrder(order_id,item_list){
        try {
            item_list.forEach(product => {
                let product_id = product.product_id;
                let ordered_quantity = product.ordered_quantity;
                await ProductOrderDAO.createOneEntity(order_id,product_id,ordered_quantity);
                updateProductAvailableQuantity(product_id,ordered_quantity)
            });

           return "Order Created Success";
       
                      
        } catch (error) {
            
        }
        
    }

    async updateProductAvailableQuantity(product_id,ordered_quantity){
        try {
            var previousAmount = await ProductDAO.getAmountById(product_id);
            var newAmount  = previousAmount - ordered_quantity;
            await ProductDAO.changeAmountById(product_id,newAmount);       
                      
        } catch (error) {
            
        }
        
    }

    async getMyOrderList(customer_id){
        try {
            var order_list = await OrderDAO.getOrdersByCustomerId(customer_id);
            var myOrders = [];
            order_list.forEach(order => {
                let id = order.orderId;
                let date = order.date;
                let totalAmount = order.totalAmount;
                let status = order.status;
                 
                let productList =[]

                var paidAmount = await PaymentDAO.getAmountById(order.orderId);
 
                var productJsonList = await ProdutOrderDAO.getProductByOrderId(order.orderId);
                productJsonList.forEach(product => {
                     let productName = await ProductDAO.getProductById(product.productId);
                     let orderedQuantity = product.quantity
                     var OneProduct = {productName,orderedQuantity}
                     productList.push(OneProduct);
                });
 
                var OneOrder = {id,date,totalAmount,paidAmount,status,productList}
                myOrders.push(OneOrder);
                
            });

            return myOrders;
        //    [
        //        {
        //            id:1,
        //            date:2020-12-12,
        //            totalAmount: 5,
        //            paidAmount: 300,
        //            status: Send to Delivery,
        //            productList:[
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

    async markOrderDelivering(customer_id,order_id){
        try {
            var response = await OrderDAO.markOrderDelivering(customer_id,order_id);

            if(response != null){
                return false
            }
            return true ;
    
                      
        } catch (error) {
            
        }

    }

    
}
    
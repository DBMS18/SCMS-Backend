const CustomerService = require('../services/customerService.js');

let customerServices = new CustomerService();

const customerController  = {};

//customer functions
customerController.getProductList = async (req, res, next) => {
    try {
        
        const product_list = await customerServices.getProductList();
        
        if(product_list.length > 0){
          const response = {
            err: 0,
            obj: product_list,//should get object list
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No Poduct Available"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};


customerController.getRouteList = async (req, res, next) => {
  try {
      
      const route_list = await customerServices.getRouteList();
      
      if(route_list.length > 0){
        const response = {
          err: 0,
          obj: route_list,//should get object list
          msg: ""
        }
        return res.json(response);
      }else{
        const response = {
          err: 1,
          obj: {},
          msg: "No route Available"
        }
        return res.json(response);
      }
      
  } catch (err) {
    next(err);
  }
  
};



customerController.checkOutMyCart = async (req, res, next) => {
    try {
        var paid_amount = req.body.paid_amount;
        var customer_id = req.body.customer_id;
        var item_list = req.body.item_list;

        const resultMsg = await customerServices.checkOutMyCart(paid_amount,customer_id,item_list,route_id);
        
        if(resultMsg === "Payment Failed"){
          const response = {
            err: 1,
            obj: {},
            msg: "Payment Failed"
          }
          return res.json(response);
        }else if(resultMsg === "Paymet success.Order Failed"){
          const response = {
            err: 1,
            obj: {},
            msg: "Paymet success. Order not success"
          }
          return res.json(response);
        }else{
          const response = {
            err: 0,
            obj: {},
            msg: "Order success"
          }
          return res.json(response); 
        }
        
    } catch (err) {
      next(err);
    }
    
};

// get my order list
customerController.getMyOrderList = async (req, res, next) => {
    try {
        var customer_id = req.query.customerId;
        const order_list = await customerServices.getMyOrderList(customer_id);
        
        if(order_list.length > 0){
          const response = {
            err: 0,
            obj: order_list,//should get object list
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No Order Available"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};

// confirm order received

customerController.markDelivering = async (req, res, next) => {
  try {
      var customer_id = req.query.customerId;
      var order_id = req.query.orderId;
      const result = await customerServices.markOrderDelivering(customer_id,order_id);
      
      if(result != null){
        const response = {
          err: 0,
          obj: true,
          msg: "Mark as delivered"
        }
        return res.json(response);
      }else{
        const response = {
          err: 1,
          obj: false,
          msg: "Marking is unsuccessful"
        }
        return res.json(response);
      }
      
  } catch (err) {
    next(err);
  }
  
};

module.exports = customerController;
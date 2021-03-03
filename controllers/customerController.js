const CustomerService = require('../services/customerService.js');

let customerServices = new CustomerService();

const customerController  = {};
Products = require('./ProductFile');

//customer functions


customerController.authCustomer = async (req, res, next) => {
  try {
    const response = {
      err: 0,
      obj: {},
      msg: "Auto logged in"
    }
    return res.json(response);
  } catch (error) {
    next(err);
  }
}

customerController.getProductList = async (req, res, next) => {
    try {
        console.log("get")
        const keyword = "";
        const product_list = await customerServices.getProductList(keyword);
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

customerController.searchProductList = async (req, res, next) => {
  try {
    const keyword = req.query.keyword;
    console.log("search"+keyword)
      const product_list = await customerServices.getProductList(keyword);
      console.log("product_list");
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
      console.log("object")
      var route_list = await customerServices.getRouteList();
      if(route_list.length > 0){
        const response = {
          err: 0,
          obj: route_list,
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
      console.log("controller started")
      var datetime = new Date();

      var today = datetime.toISOString().slice(0,10);

      var paid_amount = req.body.fields.total;
      var payment_method = req.body.fields.payment_method;

      var customer_id = req.user;
      var total_amount = 0;
      var street_number = req.body.fields.street_number;
      var street_name = req.body.fields.street_name;
      var city = req.body.fields.city;
      var zip = req.body.fields.zip;
      var expected_date = req.body.fields.date;
      var route_id = req.body.fields.route;

      var products = req.body.products.map((product)=>{
        const p = {
          product_id:product.product_id,
          ordered_quantity:product.selected,
          total_capacity:product.selected*product.capacity,
          type:product.type
        }
        total_amount = total_amount + p.total_capacity;
        return p;
      })

      const resultMsg = await customerServices.checkOutMyCart(today,paid_amount,payment_method,customer_id,total_amount,street_number,street_name,city,zip,expected_date,route_id,products);
      
      if(resultMsg.err === 0){
        const response = {
          err: 0,
          obj: {},
          msg: "Payment successfull"
        }
        return res.json(response);
      }else if(resultMsg.err === 1){
        if(resultMsg.code === 1){
          const response = {
            err: 1,
            obj: {},
            msg: "Payment error"
          }
          return res.json(response);
        }else if(resultMsg.code === 2){
          const response = {
            err: 1,
            obj: {},
            msg: "Address error"
          }
          return res.json(response);
        }else if(resultMsg.code === 3){
          const response = {
            err: 1,
            obj: {},
            msg: "order error"
          }
          return res.json(response);
        }else if(resultMsg.code === 4){
          const response = {
            err: 1,
            obj: resultMsg.products,
            msg: "Product error"
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "Something is Wrong"
          }
          return res.json(response);
        }
      }else{
        const response = {
          err: 0,
          obj: {},
          msg: "Something is Wrong"
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
        var customer_id = req.params.customer_id;

        const order_list = await customerServices.getMyOrderList(customer_id);
        
        if(order_list.length > 0){
          const response = {
            err: 0,
            obj: order_list,
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
      var customer_id = req.params.customer_id;
      var order_id = req.params.order_id;
      
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
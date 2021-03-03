const DriverAssistant = require('../services/driverAssistant.js');

let driverAssistant = new DriverAssistant();

const driverAssistantController  = {};
// get my order list
driverAssistantController.getOrdersOnDuty = async (req, res, next) => {
    try {
        var user_id = req.params.userId;

        const order_list = await driverAssistant.getOrdersOnDuty(user_id);
        
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
            msg: "No Orders Available"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};

driverAssistantController.markDelivering = async (req, res, next) => {
    try {
        var order_id = req.params.orderId;
  
        
        const result = await driverAssistant.markOrderDelivering(order_id);
        
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
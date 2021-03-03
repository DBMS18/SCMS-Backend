const { response } = require('express');
const StorekeeperService = require('../services/storekeeperService.js');

// Instantiate Storekeeper:
let storekeeperServices = new StorekeeperService();

const storekeeperController  = {};

//storekeeper functions(Tharinda)
storekeeperController.getLoginInfo = async (req, res, next) => {
 
    try {        
        const user_id = req.user;  
        const loginInfo = await storekeeperServices.getLoginInfo("2");
         
        if(loginInfo){
          const response = {
            err: 0,
            obj: loginInfo,
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No login info"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};




storekeeperController.orderSendByManager = async (req, res, next) => {
    try {        
        const user_id = req.user;  
        const order_list = await storekeeperServices.orderSendByManager("2"); 
        
        if(order_list.length >0){
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
            msg: "No Orders for your store"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};

storekeeperController.orderReceivedByStorekeeper= async (req, res, next) => {
  try {
            
      //const order_id = req.body.order_id;
      const user_id = req.user;
      const order_list = await storekeeperServices.orderReceivedByStorekeeper("2");
      
      if(order_list.length >0){
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
            msg: "No Orders in your store"
          }
          return res.json(response);
        }
      
        } catch (err) {
          next(err);
        }
  
};

storekeeperController.markOrderReceived = async (req, res, next) => {
  try {
            
    const order_id = req.body.id;
    const user_id = req.user;
    const result = await storekeeperServices.markOrderReceived(order_id,'2');
    
    if(result != null){
      const response = {
        err: 0,
        obj: true,
        msg: "Mark as Received"
      }
      return res.json(response);
    }else{
      const response = {
        err: 1,
        obj: false,
        msg: "cannot mark"
      }
      return res.json(response);
    }  
      
  } catch (err) {
    next(err);
  }
  
};
//tharinda s work over
 //----------------------task 2----------------------

 storekeeperController.getAvailableRoutes = async (req, res, next) => {
  try {
            
    const user_id = req.params.user_id;
   
    const route_list = await storekeeperServices.getAvailablerRoutes(user_id);
    
    if(route_list.length >0){
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
        msg: "No route available for your store"
      }
      return res.json(response);
    }
      
  } catch (err) {
    next(err);
  }
  
};


storekeeperController.getAvailableDrivers = async (req, res, next) => {
  try {
            
    const user_id = req.params.user_id;
   
    const driver_list = await storekeeperServices.getAvailableDrivers(user_id);
    
    if(driver_list.length == 1){
      const response = {
        err: 0,
        obj: driver_list,
        msg: "warning - last driver"
      }
      return res.json(response);
    }
    else if(driver_list.length > 1){
      const response = {
        err: 0,
        obj: driver_list,
        msg: ""
      }
      return res.json(response);
    }
    else{
      const response = {
        err: 1,
        obj: {},
        msg: "No drivers available for your store"
      }
      return res.json(response);
    }
      
  } catch (err) {
    next(err);
  }
  
};

storekeeperController.getAvailableAssistants = async (req, res, next) => {
  try {
            
    const user_id = req.params.user_id;
   
    const assistant_list = await storekeeperServices.getAvailableAssistants(user_id);
    
    if(assistant_list.length  == 1){
      const response = {
        err: 0,
        obj: assistant_list,
        msg: "warning - last driver"
      }
      return res.json(response);
    }
    else if(assistant_list.length > 1){
      const response = {
        err: 0,
        obj: assistant_list,
        msg: ""
      }
      return res.json(response);
    }
    else{
      const response = {
        err: 1,
        obj: {},
        msg: "No assistant available for your store"
      }
      return res.json(response);
    }
      
  } catch (err) {
    next(err);
  }
  
};

storekeeperController.getAvailableTrucks = async (req, res, next) => {
  try {
            
    const user_id = req.params.user_id;
   
    const truck_list = await storekeeperServices.getAvailableTrucks(user_id);
    
    if(truck_list.length >0){
      const response = {
        err: 0,
        obj: truck_list,
        msg: ""
      }
      return res.json(response);
    }else{
      const response = {
        err: 1,
        obj: {},
        msg: "No truck available for your store"
      }
      return res.json(response);
    }
      
  } catch (err) {
    next(err);
  }
  
};



//----------------------------create duty------------------------------
storekeeperController.createDutyRecord = async (req, res, next) => {
  try {
            
    const user_id = req.body.user_id;
    const route_id = req.body.route_id;
    const driver_id = req.body.driver_id;
    const assistant_id = req.body.assistant_id ;
    const truck_number = req.body.truck_number;
    const start_time =  req.body.start_time;

    const duty_id = await storekeeperServices.createDutyRecord(user_id,route_id,driver_id,assistant_id,truck_number,start_time);
    
    if(duty_id != null){
      const response = {
        err: 0,
        obj: duty_id,
        msg: "create duty record"
      }
      return res.json(response);
    }else{
      const response = {
        err: 1,
        obj: {},
        msg: "duty record not created"
      }
      return res.json(response);
    }  
      
  } catch (err) {
    next(err);
  }
  
};

storekeeperController.getReceviedOrdersFromStore = async (req, res, next) => {
  try {
            
    const user_id = req.params.user_id;  
    const route_id = req.params.route_id; 
    

    const order_list = await storekeeperServices.getReceviedOrdersFromStore(user_id,route_id);
      
    if(order_list.length >0){
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
        msg: "No Orders for your store"
      }
      return res.json(response);
    }
      
  } catch (err) {
    next(err);
  }
  
};

storekeeperController.markAsSendForDelivering = async (req, res, next) => {
  try {
            
    const order_id = req.body.order_id;
    const duty_id = req.body.duty_id;
       
    const result = await storekeeperServices.markAsSendForDelivering(order_id,duty_id);
    
    if(result != null){
      const response = {
        err: 0,
        obj: true,
        msg: "Mark as Send"
      }
      return res.json(response);
    }else{
      const response = {
        err: 1,
        obj: false,
        msg: "Mark as not send"
      }
      return res.json(response);
    }  
      
  } catch (err) {
    next(err);
  }
  
};

storekeeperController.getDutySetOff = async (req, res, next) => {
  try {
            
    const user_id = req.params.duty_id;
       
    const duties = await storekeeperServices.getDutySetOff(user_id);
    
    if(duties.length >0){
      const response = {
        err: 0,
        obj: duties,
        msg: ""
      }
      return res.json(response);
    }else{
      const response = {
        err: 1,
        obj: {},
        msg: "No duties set-off"
      }
      return res.json(response);
    }  
      
  } catch (err) {
    next(err);
  }
  
};




//-------------------------Mock function----------------------------------------------

storekeeperController.mockFunctions = async (req, res, next) => {
  try {        
      const user_id = req.params.user_id;  
      

      const customer = await storekeeperServices.mockFunctions(user_id); 
      
      if(customer != null){
        const response = {
          err: 0,
          obj: customer,
          msg: "Test Pass"
        }
        return res.json(response);
      }else{
        const response = {
          err: 1,
          obj: {},
          msg: "Test Faield"
        }
        return res.json(response);
      }
      
  } catch (err) {
    next(err);
  }
  
};




module.exports = storekeeperController;
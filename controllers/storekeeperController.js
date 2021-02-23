const StorekeeperService = require('../services/storekeeperService.js');

// Instantiate Storekeeper:
let storekeeperServices = new StorekeeperService();

const storekeeperController  = {};

//storekeeper functions
storekeeperController.orderSendByManager = async (req, res, next) => {
    try {        
        const user_id = req.params.user_id;  
        

        const order_list = await storekeeperServices.orderSendByManager(user_id); 
        
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

storekeeperController.orderReceviedToStore= async (req, res, next) => {
  try {
            
      const order_id = req.body.order_id;
      const user_id = req.body.user_id;

      

      const result = await storekeeperServices.orderReceviedToStore(order_id,user_id);
      
      if(result != null){
        const response = {
          err: 0,
          obj: true,
          msg: "Mark as Recevied"
        }
        return res.json(response);
      }else{
        const response = {
          err: 1,
          obj: false,
          msg: "Mark as not recevied"
        }
        return res.json(response);
      }
      
  } catch (err) {
    console.log(err);
    next(err);
  }
  
};

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

// storekeeperController.getAvailableTrucks = async (req, res, next) => {
//   try {
            
//     const user_id = req.params.user_id;
   
//     const truck_list = await storekeeperServices.getAvailableTrucks(user_id);
    
//     if(truck_list.length >0){
//       const response = {
//         err: 0,
//         obj: truck_list,
//         msg: ""
//       }
//       return res.json(response);
//     }else{
//       const response = {
//         err: 1,
//         obj: {},
//         msg: "No truck available for your store"
//       }
//       return res.json(response);
//     }
      
//   } catch (err) {
//     next(err);
//   }
  
// };



//----------------------------create duty------------------------------
storekeeperController.createDutyRecord = async (req, res, next) => {
  try {
            
    const user_id = req.body.user_id;
    const route_id = req.body.route_id;
    const driver_id = req.body.driver_id;
    const assistant_id = req.body.assistant_id ;
    const truck_number = req.body.truck_number;  

    const duty_id = await storekeeperServices.createDutyRecord(user_id,route_id,driver_id,assistant_id,truck_number);
    
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
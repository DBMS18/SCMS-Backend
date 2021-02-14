const StorekeeperService = require('../services/storekeeperService.js');

// Instantiate Storekeeper:
let storekeeperServices = new StorekeeperService();

const storekeeperController  = {};

//storekeeper functions
storekeeperController.orderSendByManager = async (req, res, next) => {
    try {        
        const store_id = req.query.store_id;  // not sure -from session

        const order_list = await storekeeperServices.orderSendByManager(store_id);
        
        if(order_list.length){
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
            
      const order_id = req.body.order_id;// not sure 
      const store_id = 23// from session    
      const result = await storekeeperServices.orderReceviedToStore(order_id,store_id);
      
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
    next(err);
  }
  
};

//
storekeeperController.getReceviedOrdersFromStore = async (req, res, next) => {
  try {
            
    const store_id = req.query.store_id// from session     
    const order_list = await storekeeperServices.getReceviedOrdersFromStore(store_id);
      
    if(order_list.length){
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
            
    const order_id = req.body.order_id;// not sure
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


storekeeperController.createDutyRecord = async (req, res, next) => {
  try {
            
    const store_id = req.body.store_id;// not sure
    const time_slot_id = req.body.time_slot_id;
    const driver_id = req.body.driver_id;
    const assistant_id = req.body.assistant_id ;
    const truck_number = req.body.truck_number;  

    const duty_id = await storekeeperServices.createDutyRecord(store_id,time_slot_id,driver_id,assistant_id,truck_number);
    
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

storekeeperController.getAvailableDrivers = async (req, res, next) => {
  try {
            
    const store_id = req.query.store_id;// not sure
   
    const driver_list = await storekeeperServices.getAvailableDrivers(store_id);
    
    if(driver_list.length){
      const response = {
        err: 0,
        obj: driver_list,//should get object list
        msg: ""
      }
      return res.json(response);
    }else{
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
            
    const store_id = req.query.store_id;// not sure
   
    const assistant_list = await storekeeperServices.getAvailableAssistants(store_id);
    
    if(assistant_list.length){
      const response = {
        err: 0,
        obj: assistant_list,//should get object list
        msg: ""
      }
      return res.json(response);
    }else{
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
            
    const store_id = req.query.store_id;// not sure
   
    const truck_list = await storekeeperServices.getAvailableTrucks(store_id);
    
    if(truck_list.length){
      const response = {
        err: 0,
        obj: truck_list,//should get object list
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

storekeeperController.getTimeSlots = async (req, res, next) => {
  try {
            
   
    const timeSlot_list = await storekeeperServices.getTimeSlot();
    
    if(timeSlot_list.length){
      const response = {
        err: 0,
        obj: timeSlot_list,//should get object list
        msg: ""
      }
      return res.json(response);
    }else{
      const response = {
        err: 1,
        obj: {},
        msg: "No time slot available for your store"
      }
      return res.json(response);
    }
      
  } catch (err) {
    next(err);
  }
  
};

storekeeperController.getSetOffDutyList = async (req, res, next) => {
  try {
            
    const store_id = req.query.store_id;// not sure
   
    const duty_list = await storekeeperServices.getSetOffDutyList(store_id);
    
    if(duty_list.length){
      const response = {
        err: 0,
        obj: duty_list,//should get object list
        msg: ""
      }
      return res.json(response);
    }else{
      const response = {
        err: 1,
        obj: {},
        msg: "No duty for your store"
      }
      return res.json(response);
    }
      
  } catch (err) {
    next(err);
  }
  
};



storekeeperController.markDutyFinished = async (req, res, next) => {
  try {
            
    const duty_id = req.body.duty_id;// not sure
   
    const result = await storekeeperServices.markDutyFinished(duty_id);
    
    if(result != null){
      const response = {
        err: 0,
        obj: true,
        msg: "Mark as finished"
      }
      return res.json(response);
    }else{
      const response = {
        err: 1,
        obj: false,
        msg: "Mark as not finished"
      }
      return res.json(response);
    }  
      
  } catch (err) {
    next(err);
  }
  
};





module.exports = storekeeperController;
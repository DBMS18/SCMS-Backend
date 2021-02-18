const StorekeeperService = require('../services/storekeeperService.js');

// Instantiate Storekeeper:
let storekeeperServices = new StorekeeperService();

const storekeeperController  = {};

//storekeeper functions
storekeeperController.orderSendByManager = async (req, res, next) => {
    try {        
        const user_id = req.query.user_id;  
        

        const order_list = await storekeeperServices.orderSendByManager(user_id);
        
        if(order_list.length >0){
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
    next(err);
  }
  
};

//----------------------task 2----------------------

storekeeperController.getAvailableDrivers = async (req, res, next) => {
  try {
            
    const user_id = req.query.user_id;// not sure
   
    const driver_list = await storekeeperServices.getAvailableDrivers(user_id);
    
    if(driver_list.length >0){
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
            
    const user_id = req.query.user_id;// not sure
   
    const assistant_list = await storekeeperServices.getAvailableAssistants(user_id);
    
    if(assistant_list.length >0){
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
            
    const user_id = req.query.user_id;// not sure
   
    const truck_list = await storekeeperServices.getAvailableTrucks(user_id);
    
    if(truck_list.length >0){
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

storekeeperController.getAvailableRoutes = async (req, res, next) => {
  try {
            
    const user_id = req.query.user_id;
   
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

//----------------------------create duty------------------------------
storekeeperController.createDutyRecord = async (req, res, next) => {
  try {
            
    const user_id = req.body.user_id;// not sure
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
            
    const user_id = req.query.user_id;  
    const route_id = req.query.route_id;   
    const order_list = await storekeeperServices.getReceviedOrdersFromStore(user_id);
      
    if(order_list.length >0){
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


//-------------------------Part 3----------------------------------------------



// storekeeperController.getTimeSlots = async (req, res, next) => {
//   try {
            
   
//     const timeSlot_list = await storekeeperServices.getTimeSlot();
    
//     if(timeSlot_list.length >0){
//       const response = {
//         err: 0,
//         obj: timeSlot_list,//should get object list
//         msg: ""
//       }
//       return res.json(response);
//     }else{
//       const response = {
//         err: 1,
//         obj: {},
//         msg: "No time slot available for your store"
//       }
//       return res.json(response);
//     }
      
//   } catch (err) {
//     next(err);
//   }
  
// };

// storekeeperController.getSetOffDutyList = async (req, res, next) => {
//   try {
            
//     const user_id = req.query.user_id;// not sure
   
//     const duty_list = await storekeeperServices.getSetOffDutyList(user_id);
    
//     if(duty_list.length >0){
//       const response = {
//         err: 0,
//         obj: duty_list,//should get object list
//         msg: ""
//       }
//       return res.json(response);
//     }else{
//       const response = {
//         err: 1,
//         obj: {},
//         msg: "No duty for your store"
//       }
//       return res.json(response);
//     }
      
//   } catch (err) {
//     next(err);
//   }
  
// };



// storekeeperController.markDutyFinished = async (req, res, next) => {
//   try {
            
//     const duty_id = req.body.duty_id;// not sure
   
//     const result = await storekeeperServices.markDutyFinished(duty_id);
    
//     if(result != null){
//       const response = {
//         err: 0,
//         obj: true,
//         msg: "Mark as finished"
//       }
//       return res.json(response);
//     }else{
//       const response = {
//         err: 1,
//         obj: false,
//         msg: "Mark as not finished"
//       }
//       return res.json(response);
//     }  
      
//   } catch (err) {
//     next(err);
//   }
  
// };





module.exports = storekeeperController;
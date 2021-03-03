
const ManagerService = require('../services/managerService');


// Instantiate Manager:
let managerServices = new ManagerService();

const managerController  = {};

//Manager functions
managerController.dashboardDetails= async(req,res,next) =>{
    console.log('managerDashboard');
    try {        
        const manager_id = req.params.user_id;  
        
        const dashboard_details = await managerServices.getDashboardDetails(manager_id);
        console.log(manager_id);
        if(dashboard_details.length){
          const response = {
            err: 0,
            obj: dashboard_details,//should get object list
            msg: ""
          }

          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No matching ID found"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
};



managerController.getAllOrders_Trains= async(req,res,next) =>{
    console.log('get all orders and trains');
    try {        
        //const store_id = req.body.store_id;  // not sure   
        const order_list = await managerServices.getOrdersPendingToAssignTrains();
        console.log(order_list);
        if(order_list.length){
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
            msg: "No Orders Today"
          }
          return res.json(response);
        }
        
        
    } catch (err) {
      next(err);
    }
    
};
managerController.addTrainOrderRecord= async(req,res,next) =>{
    console.log('Adding a new record');
    try {        
        const order_id = req.body.order_id;   
        const train_id = req.body.train_id;

      const result = await managerServices.addTrainOrderRecord(order_id,train_id);
      
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




managerController.getAllRecords= async(req,res,next) =>{
    console.log('get All Records');
    try {        
        //const store_id = req.body.store_id;  // not sure   
        const record_list = await managerServices.getAllRecordsAssigned();
        
        if(record_list.length){
          const response = {
            err: 0,
            obj: record_list,//should get object list
            msg: ""
          }

          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No Orders Assigned Yet"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};

managerController.getAllTrains= async(req,res,next) =>{
  console.log('get All Trains');
  try {        
      //const store_id = req.body.store_id;  // not sure   
      const record_list = await managerServices.getAlltrainsWithRemainingCapacity();
      
      if(record_list.length){
        const response = {
          err: 0,
          obj: record_list,//should get object list
          msg: ""
        }

        return res.json(response);
      }else{
        const response = {
          err: 1,
          obj: {},
          msg: "No Orders Assigned Yet"
        }
        return res.json(response);
      }
      
  } catch (err) {
    next(err);
  }
  
};
managerController.removeTrainOrderRecord= async(req,res,next) =>{
    console.log('delete a record');
    try {        
        const order_id = req.body.order_id; 
        const train_id = req.body.train_id;  
        const result = await managerServices.deleteRecord(order_id,train_id);
        
        if(result != null){
          const response = {
            err: 0,
            obj: {},
            msg: "Record Deleted Sucessfully"
          }

          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "Something Went Wrong"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};
managerController.updateTrainOrderRecord= async(req,res,next) =>{
    console.log('Update a Record');
    try {        
        const order_id = req.body.order_id;  
        const train_id =req.body.train_id; 


        const result = await managerServices.updateTrainOrderRecord(order_id,train_id);
      
      if(result != null){    
        const response = {
          err: 0,
          obj: true,
          msg: "Mark as Updated"
        }

        return res.json(response);
      }else{
        const response = {
          err: 1,
          obj: false,
          msg: "Mark as not Updated"
        }
        return res.json(response);
      }
        
    } catch (err) {
      next(err);
    }
    
};


module.exports = managerController;

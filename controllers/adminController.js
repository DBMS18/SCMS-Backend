const { response } = require('express');
const AdminService = require('../services/adminService.js');
let adminServices = new AdminService();

const adminController  = {};

adminController.itemsWithMostOrders = async (req, res, next) => {
 
    try {        
          
        const mostOrderList = await adminServices. itemsWithMostOrders();
        
        if(mostOrderList.length >0){
            
          const response = {
            err: 0,
            obj: mostOrderList,
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No list"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};


adminController.customerOrderReport = async (req, res, next) => {
 
    try {        
          
        const customerOrderReportList = await adminServices.customerOrderReport();
        
        if(customerOrderReportList.length >0){
            
          const response = {
            err: 0,
            obj: customerOrderReportList,
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No list"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};



adminController.salesReport = async (req, res, next) => {
 
    try {        
          
        const salesReportList = await adminServices.salesReport();
        
        if(salesReportList.length >0){
            
          const response = {
            err: 0,
            obj: salesReportList,
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No list"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};

adminController.driverWorkedHours = async (req, res, next) => {
 
    try {        
          
        const driverWorkedHoursList = await adminServices.driverWorkedHours();
        
        if(driverWorkedHoursList.length >0){
            
          const response = {
            err: 0,
            obj: driverWorkedHoursList,
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No list"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};
adminController.assistantWorkedHours = async (req, res, next) => {
 
    try {        
          
        const assistantWorkedHoursList = await adminServices.assistantWorkedHours();
        
        if(assistantWorkedHoursList.length >0){
            
          const response = {
            err: 0,
            obj: assistantWorkedHoursList,
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No list"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};
adminController.truckWorkedHours = async (req, res, next) => {
 
    try {        
          
        const truckWorkedHoursList = await adminServices.truckWorkedHours();
        
        if(truckWorkedHoursList.length >0){
            
          const response = {
            err: 0,
            obj: truckWorkedHoursList,
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No list"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};
adminController.quarterlySalesReport = async (req, res, next) => {
 
    try {        
          
        const quarterlySalesReportList = await adminServices.quarterlySalesReport();
        
        if(quarterlySalesReportList.length >0){
            
          const response = {
            err: 0,
            obj: quarterlySalesReportList,
            msg: ""
          }
          return res.json(response);
        }else{
          const response = {
            err: 1,
            obj: {},
            msg: "No list"
          }
          return res.json(response);
        }
        
    } catch (err) {
      next(err);
    }
    
};


module.exports = adminController;
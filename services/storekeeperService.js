// const StorekeeperDAO =require('../models/dao/storekeeperDAO.js');
const RouteDAO = require("../models/dao/routeDAO.js");
const OrderStoreDAO = require("../models/dao/order_storeDAO.js");
class StorekeeperService{
    constructor(){
        
    }
    
    //get Train order list
    async orderSendByManager(store_id){
        try {
           var OurStoreOrdersList = [] 
           var allOrdersList = await OrderDAO.readAllEntity(); //get all orders list with not recvied status
           allOrdersList.forEach(order => {
               var storeId = await RouteDAO.getStoreIdByRouteId(order.routeId);
               if(storeId === store_id){
                let id = order.orderId;
                let date = order.date;
                let totalAmount = order.totalAmount;
                
                let productList =[]

                var productJsonList = await ProdutOrderDAO.getProductByOrderId(order.orderId);
                productJsonList.forEach(product => {
                    let productName = await ProductDAO.getProductById(product.productId);
                    let orderedQuantity = product.quantity
                    var OneProduct = {productName,orderedQuantity}
                    productList.push(OneProduct);
                });

                var OneOrder = {id,date,totalAmount,productList}
                OurStoreOrdersList.push(OneOrder);
               }
           });
          
           return OurStoreOrdersList;
        //    [
        //        {
        //            id:1,
        //            date:2020-12-12,
        //            totalAmount: 5,
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

    async orderReceviedToStore(order_id,store_id){
        try {

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;
            
            // add this order to order_store table
            await OrderStoreDAO.createOneEntity(order_id,store_id,dateNow);

            //change order status
            await OrderDAO.changeOrderStatus(order_id,"Recevied To Store")
          
            return "Mark Success";  
                      
        } catch (error) {
            
        }        
    }

    // get recevied orders
    async getReceviedOrdersFromStore(store_id){
        try {

            var OurStoreOrdersList = [] 
            var allOrdersList = await OrderDAO.getAllUnReceviedOrders(); //get all orders list with not recvied status
            allOrdersList.forEach(order => {
                var storeId = await RouteDAO.getStoreIdByRouteId(order.routeId);
                if(storeId === store_id){
                 let id = order.orderId;
                 let date = order.date;
                 let totalAmount = order.totalAmount;              

                 let productList =[]
 
                 var productJsonList = await ProdutOrderDAO.getProductByOrderId(order.orderId);
                 productJsonList.forEach(product => {
                     let productName = await ProductDAO.getProductById(product.productId);
                     let orderedQuantity = product.quantity
                     var OneProduct = {productName,orderedQuantity}
                     productList.push(OneProduct);
                 });

                 var destinationJson = await CustomerDAO.getDestinationByCustomerId(order.customerId);
                 let addressline1 = destinationJson.addressLine1;
                 let addressline2 = destinationJson.addressLine2;
                 let city = destinationJson.city;

                 let destination = {addressline1,addressline2,city};

                 var OneOrder = {id,date,totalAmount,destination,productList}
                 OurStoreOrdersList.push(OneOrder);
                }
            });
           
            return OurStoreOrdersList;
        //    [
        //        {
        //            id:1,
        //            date:2020-12-12,
        //            totalAmount: 5,
        //            destination:{
        //                 addressline1:No25,ABC Road,
        //                 addressline2: Katubedda
        //                 city: Moratuwa
        //                 },
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

    // mark as send for delivering
    async markAsSendForDelivering(order_id,duty_id){
        try {
            
            await OrderDutyRecordDAO.createOneEntity(order_id,duty_id);

         
            await OrderDAO.changeOrderStatus(order_id,"Send for Delivery")
          
            return "Mark Success";  
                      
        } catch (error) {
            
        }        
    }


    async createDutyRecord(store_id,time_slot_id,driver_id,assistent_id,truck_number){
        try {

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;

            var start_time = '10:30:00' //get current time
            var status = "set-off"

            await DutyRecordDAO.createOneEntity(store_id,time_slot_id,driver_id,assistent_id,truck_number,start_time,status);
            duty_id = await DutyRecordDAO.getLastCreatedDutyId(store_id,time_slot_id,driver_id,assistent_id,truck_number); // not sure
           
          
            return duty_id;  
                      
        } catch (error) {
            
        }        
    }

    async getAvailableDrivers(store_id){
        try { 
          //check following
            // A driver should never be assigned to two consecutive Truck schedule and for assistant maximum consecutive turns is two.
            // Total work hours per driver should not exceed 40 hrs/week and for an assistant it’s 60 hrs/week
                      

            //return driver list
            // [
            //     {
            //         driver_id: 1,
            //         driver_name: Kamal
            //     },
            //     ..........
            // ]
        } catch (error) {
            
        } 
        
    }

    async getAvailableAssistants(store_id){
        try { 
        //check following
            // A driver should never be assigned to two consecutive Truck schedule and for assistant maximum consecutive turns is two.
            // Total work hours per driver should not exceed 40 hrs/week and for an assistant it’s 60 hrs/week
                      

            //return driver list
            // [
            //     {
            //         assistant_id: 1,
            //         assistant_name: Kamal
            //     },
            //     ..........
            // ]
                      
        } catch (error) {
            
        }        
    }

    async getAvailableTrucks(store_id){
        try { 
          
        //check following
            // A driver should never be assigned to two consecutive Truck schedule and for assistant maximum consecutive turns is two.
            // Total work hours per driver should not exceed 40 hrs/week and for an assistant it’s 60 hrs/week
                      

            //return driver list
            // [
            //     {
            //         truck_number: 1
            //        
            //     },
            //     ..........
            // ]
                      
        } catch (error) {
            
        }        
    }

    async getTimeSlot(){
        try {

            var day = "Sunday" // get week day
            var time_slot_list = await TimeSlotDAO.getTimeListByDay(day);
            
            return time_slot_list;
            // [
            //     {
            //         time_slot_id:1,
            //         time:10:10:00,
            //         day:sunday
            //     },
            //     .........
            // ]
                      
        } catch (error) {
            
        }        
    }

    async getSetOffDutyList(store_id){
        try { 
          
            var dutyList = [];
            var dutyJsonList = await DutyRecordDAO.getSetoffDuty(store_id,date); //with setoff state
            dutyJsonList.forEach(duty => {
                let dutyId = duty.dutyId;
                let startTime = duty.startTime
                let driverName = await DriverDAO.getNameById(duty.driverId);
                let assistantName = await DriverAssistentDAO.getNameById(duty.assistantId);
                let truckNumber = duty.truckNumber;

                var OneDuty = {dutyId,startTime,driverName,assistantName,truckNumber};
                dutyList.push(OneDuty);
                 
            });
            return dutyList;
            // [
            //     {
            //         duty_id: 1,
            //         start_time:10:30:00,
            //         driver_name:Kamal,
            //         assistant_name:Vimal,
            //         truck_number:NB30-3737                   
            //     },
            //     ..........
            // ]
                      
        } catch (error) {
            
        }        
    }

  
    async markDutyFinished(duty_id){
        try { 
          
            var status = "Arrived";
            var timeNote = "10:30:12" //get current time 

            await DutyRecordDAO.markDutyFinished(duty_id,status,timeNote);                      

            //release driver/assistant/truck
            return "Mark as finished"
            
                      
        } catch (error) {
            
        }        
    }

    
    async releaseDriver(driver_id){
        try { 
          
        } catch (error) {
            
        }        
    }

    async releaseAssistant(assistant_id){
        try { 
          
        } catch (error) {
            
        }        
    }

    async releaseTruck(truck_number){
        try { 
          
        } catch (error) {
            
        }        
    }




    //mark driver/assistent/truck arrival
}

module.exports = StorekeeperService;
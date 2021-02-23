//const StorekeeperDAO =require('../models/dao/storekeeperDAO.js');
const OrderDAO = require("../models/dao/orderDAO.js");
const RouteDAO = require("../models/dao/routeDAO.js");
const OrderStoreDAO = require("../models/dao/order_storeDAO");
const DriverDAO = require("../models/dao/driverDAO");
const AssistantDAO = require("../models/dao/assistantDAO");
const OrderDutyRecordDAO  = require("../models/dao/order_dutyRecordDAO.js");
const UserDAO = require("../models/dao/userDAO.js");
const QueryDAO = require("../models/dao/QueryDAO");
const DutyRecordDAO = require("../models/dao/dutyRecordDAO.js");
const StorekeeperDutyRecordDAO = require("../models/dao/storekeeper_dutyRecordDAO.js");

class StorekeeperService {
    constructor() {

    }

    //get orders in Train list
    async orderSendByManager(user_id) {
        try {
            const store_id = await QueryDAO.getStoreId(user_id);
          
            
            var OurStoreOrdersList = [] 
            var allOrdersList = await OrderDAO.getAllUnReceviedOrders(); //get all orders list with not recvied status
            
            for (let i = 0; i < allOrdersList.length; i++) {
                var order = allOrdersList[i];
                const storeId = await RouteDAO.getStoreIdByRouteId(order.route_id);
                if (storeId === store_id) {
                    let order_id = order.order_id;
                    let date = order.date;
                    let total_capacity = order.total_capacity;

                    var product_list = await QueryDAO.getProductByOrderId(id);
                    
                    var OneOrder = { order_id, date, total_capacity, product_list }
                    OurStoreOrdersList.push(OneOrder);
                }
            }

            return OurStoreOrdersList;
            //    [
            //        {
            //            id:1,
            //            date:2020-12-12,
            //            total_capacity: 50,
            //            product_list:[
            //                 {
            //                     product_id:2
            //                     name:Shampoo,
            //                     ordered_quantity: 10
            //                 },
            //                 ..........                           
            //            ]
            //        },
            //             ..........
            //    ]

        } catch (error) {
            console.log(error)
        }

    }

    async orderReceviedToStore(order_id, user_id) {
        try {

            const store_id =  await QueryDAO.getStoreId(user_id);

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;
          
               
            await OrderStoreDAO.createOneEntity(order_id, store_id, dateNow);

            await OrderDAO.changeOrderStatus(order_id, "Recevied To Store");

            return "Mark Success";

        } catch (error) {
            console.log(error);
        }
    }


    //-----------------------task 2--------------------------

    async getAvailablerRoutes(user_id) {
        try {

            const store_id = await QueryDAO.getStoreId(user_id);
            
            var route_list = await QueryDAO.getRouteForOrdersByStore(store_id);
            


            return route_list;

            // [
            //     {
            //         route_id:1,
            //         discription: Wadduwa
            //     }
            // ]


        } catch (error) {

        }
    }


    async getAvailableDrivers(user_id) {
        try {
            const store_id = await QueryDAO.getStoreId(user_id);
            const driverList = []


            var drivers = await DriverDAO.getUnlockDrivers(store_id)
            for (let i = 0; i < drivers.length; i++) {
                var driver = drivers[i];

                let driver_id = driver.driver_id;
                let driver_name = driver.driver_name;

                var OneDriver = {driver_id,driver_name}
                driverList.push(OneDriver);
            }
            //get working hours < 40 drivers in Store = store_id

            //


            return driverList
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

    async getAvailableAssistants(user_id) {
        try {
            const store_id = await QueryDAO.getStoreId(user_id);
      

            const assistantList = [];
            var assistants = await AssistantDAO.getUnlocHalfLockkAssistant(store_id);
            for (let i = 0; i < assistants.length; i++) {
                var assistant = assistants[i];

                let assistant_id = assistant.assistant_id;
                let assistant_name = assistant.assistant_name;

                var OneAssistant = {assistant_id,assistant_name}
                assistantList.push(OneAssistant);
            }

            return assistantList;
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

    // async getAvailableTrucks(user_id) {
    //     try {

    //         const store_id = await QueryDAO.getStoreId(user_id);
    //         //check following
    //         // A driver should never be assigned to two consecutive Truck schedule and for assistant maximum consecutive turns is two.
    //         // Total work hours per driver should not exceed 40 hrs/week and for an assistant it’s 60 hrs/week


    //         //return driver list
    //         // [
    //         //     {
    //         //         truck_number: 1
    //         //        
    //         //     },
    //         //     ..........
    //         // ]

    //     } catch (error) {

    //     }
    // }

    
    //-------------------create duty ---------------------------

    async createDutyRecord(user_id, route_id, driver_id, assistent_id, truck_number) {
        try {

            const store_id = await QueryDAO.getStoreId(user_id);

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;
            var currentTime = "Now Time"

            let spendTime = await RouteDAO.getSpendTime(route_id);

            let endTime = currentTime + spendTime;


            var duty_id = await DutyRecordDAO.createOneEntity(store_id, route_id, driver_id, assistent_id, truck_number, endTime); //check result here
           
            await StorekeeperDutyRecordDAO.createOneEntity(user_id,duty_id);

            return duty_id;

        } catch (error) {

        }
    }

    
    async getReceviedOrdersFromStore(user_id,route_id) {
        try {
            const store_id = await QueryDAO.getStoreId(user_id);
          
            
            var OurStoreOrdersList = [] 
            var allOrdersList = await QueryDAO.getOrdersInMyStore(store_id,route_id); 
            
            for (let i = 0; i < allOrdersList.length; i++) {
                var order = allOrdersList[i];
                
                let order_id = order.order_id;
                let date = order.date;
                let total_capacity = order.total_capacity;

                var product_list = await QueryDAO.getProductByOrderId(id);
                    
                var OneOrder = { order_id, date, total_capacity, product_list }
                OurStoreOrdersList.push(OneOrder);
            }

            return OurStoreOrdersList;
            //    [
            //        {
            //            id:1,
            //            date:2020-12-12,
            //            total_capacity: 50,
            //            product_list:[
            //                 {
            //                     product_id:2
            //                     name:Shampoo,
            //                     ordered_quantity: 10
            //                 },
            //                 ..........                           
            //            ]
            //        },
            //             ..........
            //    ]

        } catch (error) {
            console.log(error)
        }
    }

   
    async markAsSendForDelivering(order_id, duty_id) {
        try {

            await OrderDutyRecordDAO.createOneEntity(order_id, duty_id);

            await OrderDAO.changeOrderStatus(order_id, "Send for Delivering");

            return "Mark Success";

        } catch (error) {

        }
    }

}

module.exports = StorekeeperService;
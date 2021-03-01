//const StorekeeperDAO =require('../models/dao/storekeeperDAO.js');
const OrderDAO = require("../models/dao/orderDAO.js");
const RouteDAO = require("../models/dao/routeDAO.js");
const OrderStoreDAO = require("../models/dao/order_storeDAO");
const DriverDAO = require("../models/dao/driverDAO");
const AssistantDAO = require("../models/dao/assistantDAO");
const OrderDutyRecordDAO  = require("../models/dao/order_dutyRecordDAO.js");
const TruckDAO = require("../models/dao/TruckDAO.js");
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
            
            var route_list = await QueryDAO.getRouteForOrdersByStore(store_id.store_id);

            return route_list;

            // [
            //     {
            //         route_id:1,
            //         route_name: Wadduwa
            //     }
            // ]


        } catch (error) {

        }
    }


    async getAvailableDrivers(user_id) {
        try {

            var curr = new Date; 
            var first = curr.getDate() - curr.getDay(); 
            var firstday = new Date(curr.setDate(first));
            var dd = String(firstday.getDate()).padStart(2, '0');
            var mm = String(firstday.getMonth() + 1).padStart(2, '0');
            var yyyy = firstday.getFullYear();
            var weekStartDate = yyyy + '-' + mm + '-' + dd;


            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;

            console.log(weekStartDate)

            const store_id = await QueryDAO.getStoreId(user_id);
            const driverList = []


            var drivers = await DriverDAO.getUnlockDrivers(store_id.store_id)
            
            for (let i = 0; i < drivers.length; i++) {

                var driver = drivers[i];

                let driver_id = driver.driver_id;
                let driver_name = driver.first_name;

                var times = await DriverDAO.getWeekHours(driver.driver_id,weekStartDate,dateNow)

                if(times < 40){
                    var OneDriver = {driver_id,driver_name}
                    driverList.push(OneDriver);
                }
                

                
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
            var assistants = await AssistantDAO.getUnlocHalfLockkAssistant(store_id.store_id);
            for (let i = 0; i < assistants.length; i++) {
                var assistant = assistants[i];

                let assistant_id = assistant.assistant_id;
                let assistant_name = assistant.first_name;

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

    async getAvailableTrucks(user_id) {
        try {

            const store_id = await QueryDAO.getStoreId(user_id);
            var trucks = await TruckDAO.getUnlockTrucks(store_id.store_id);
            console.log(trucks);


            return trucks
            // [
            //     {
            //         truck_number: 1,
            //         capacity:23
                   
            //     },
            //     ..........
            // ]

        } catch (error) {

        }
    }

    
    //-------------------create duty ---------------------------

    async createDutyRecord(user_id, route_id, driver_id, assistent_id, truck_number,start_time) {
        try {

            const store_id = await QueryDAO.getStoreId(user_id);

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;
            var starting  =start_time + ":00";

            var spendTime = await RouteDAO.getSpendTime(route_id);

            var endTime = parseInt(start_time) + parseInt(spendTime);

            var ending = endTime + ":00";


            var duty_id = await DutyRecordDAO.createOneEntity(store_id, route_id, driver_id, assistent_id, truck_number,dateNow, starting,ending); //check result here
            await QueryDAO.changeOtherEmployeeStatus(store_id,dateNow);
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

    async getDutySetOff(user_id) {
        try {
            
            const store_id = await QueryDAO.getStoreId(user_id);

            const duty_list = await QueryDAO.getMyStoreSetOff(store_id.store_id);

            return duty_list;

        } catch (error) {

        }
    }

    async markDutyFinished(duty_id) {
        try {


            await DutyRecordDAO.markDutyOff(duty_id);


            return "Mark Success";

        } catch (error) {

        }
    }
   
    async  mockFunctions(user_id) {
        try {

            var customer = await QueryDAO.mockTest(user_id);

           

            return customer;

        } catch (error) {

        }
    }

}

module.exports = StorekeeperService;
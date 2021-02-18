// const StorekeeperDAO =require('../models/dao/storekeeperDAO.js');
const OrderDAO = require("../models/dao/orderDAO.js");
const RouteDAO = require("../models/dao/routeDAO.js");
const OrderStoreDAO = require("../models/dao/order_storeDAO.js");
const OrderDutyRecordDAO  = require("../models/dao/order_dutyRecordDAO.js");
const UserDAO = require("../models/dao/userDAO.js");
const QueryDAO = require("../models/dao/QueryDAO.js");
const DutyRecordDAO = require("../models/dao/dutyRecordDAO.js");

class StorekeeperService {
    constructor() {

    }

    //get orders in Train list
    async orderSendByManager(user_id) {
        try {
            const myUser = await UserDAO.readOneEntity(user_id);
            const store_id = myUser.storeId;

            var OurStoreOrdersList = []
            var allOrdersList = await OrderDAO.getAllUnReceviedOrders(); //get all orders list with not recvied status
            allOrdersList.forEach(order => {
                var storeId = await RouteDAO.getStoreIdByRouteId(order.routeId);
                if (storeId === store_id) {
                    let id = order.orderId;
                    let date = order.date;
                    let total_amount = order.totalAmount;

                    var product_list = await QueryDAO.getProductByOrderId(id);
                    
                    var OneOrder = { id, date, total_amount, product_list }
                    OurStoreOrdersList.push(OneOrder);
                }
            });

            return OurStoreOrdersList;
            //    [
            //        {
            //            id:1,
            //            date:2020-12-12,
            //            total_amount: 5,
            //            product_list:[
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

    async orderReceviedToStore(order_id, user_id) {
        try {

            const myUser = await UserDAO.readOneEntity(user_id);
            const store_id = myUser.storeId;

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;

            // add this order to order_store table
            await OrderStoreDAO.createOneEntity(order_id, store_id, dateNow);

            //change order status
            await OrderDAO.changeOrderStatus(order_id, "Recevied To Store");

            return "Mark Success";

        } catch (error) {

        }
    }


    //-----------------------task 2--------------------------


    async getAvailableDrivers(user_id) {
        try {
            const myUser = await UserDAO.readOneEntity(user_id);
            const store_id = myUser.storeId;
            //check following
            // A driver should never be assigned to two consecutive Truck schedule and for assistant maximum consecutive turns is two.
            // Total work hours per driver should not exceed 40 hrs/week and for an assistant it’s 60 hrs/week.


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

    async getAvailableAssistants(user_id) {
        try {
            const myUser = await UserDAO.readOneEntity(user_id);
            const store_id = myUser.storeId;
            //check following
            // A driver should never be assigned to two consecutive Truck schedule and for assistant maximum consecutive turns is two.
            // Total work hours per driver should not exceed 40 hrs/week and for an assistant it’s 60 hrs/week.


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

    async getAvailableTrucks(user_id) {
        try {

            const myUser = await UserDAO.readOneEntity(user_id);
            const store_id = myUser.storeId;
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

    async getAvailablerRoutes(user_id) {
        try {

            const myUser = await UserDAO.readOneEntity(user_id);
            const store_id = myUser.storeId;
            
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

    //-------------------create duty ---------------------------

    async createDutyRecord(user_id, route_id, driver_id, assistent_id, truck_number) {
        try {

            const myUser = await UserDAO.readOneEntity(user_id);
            const store_id = myUser.storeId;

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            var dateNow = yyyy + '-' + mm + '-' + dd;
            var currentTime = "Now Time"

            let spendTime = await RouteDAO.getSpendTime(route_id);

            let endTime = currentTime + spendTime;


            await DutyRecordDAO.createOneEntity(store_id, route_id, driver_id, assistent_id, truck_number, endTime);
            duty_id = await DutyRecordDAO.getLastCreatedDutyId(store_id, route_id, driver_id, assistent_id, truck_number); // not sure


            return duty_id;

        } catch (error) {

        }
    }

    // get recevied orders
    async getReceviedOrdersFromStore(user_id,route_id) {
        try {
            const myUser = await UserDAO.readOneEntity(user_id);
            const store_id = myUser.storeId;

            var OurStoreOrdersList = []
            var allOrdersList = await QueryDAO.getOrdersInMyStore(store_id,route_id);
            allOrdersList.forEach(order => {
                let id = order.orderId;
                let orderDate = order.date;
                let receivedDate = order.date
                let total_amount = order.total_amount;

                var product_list = await QueryDAO.getProductByOrderId(id);

               
                var OneOrder = { id, orderDate, receivedDate, total_amount, product_list }
                OurStoreOrdersList.push(OneOrder);

            });

            return OurStoreOrdersList;
            //    [
            //        {
            //            id:1,
            //            orderDate: 2020-12-12,
            //            receivedDate: 2021-01-02,
            //            total_amount: 5,
            //            product_list:[
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
    async markAsSendForDelivering(order_id, duty_id) {
        try {

            await OrderDutyRecordDAO.createOneEntity(order_id, duty_id);

            await OrderDAO.changeOrderStatus(order_id, "Send for Delivery");

            return "Mark Success";

        } catch (error) {

        }
    }


    


    // async getTimeSlot() {
    //     try {

    //         var day = "Sunday" // get week day
    //         var time_slot_list = await TimeSlotDAO.getTimeListByDay(day);

    //         return time_slot_list;
    //         // [
    //         //     {
    //         //         time_slot_id:1,
    //         //         time:10:10:00,
    //         //         day:sunday
    //         //     },
    //         //     .........
    //         // ]

    //     } catch (error) {

    //     }
    // }

    // async getSetOffDutyList(user_id) {
    //     try {

    //         const myUser = await UserDAO.readOneEntity(user_id);
    //         const store_id = myUser.storeId;

    //         var dutyList = [];

    //         var today = new Date()
    //         var dd = String(today.getDate()).padStart(2, '0');
    //         var mm = String(today.getMonth() + 1).padStart(2, '0');
    //         var yyyy = today.getFullYear();
    //         var dateNow = yyyy + '-' + mm + '-' + dd;

    //         var dutyJsonList = await DutyRecordDAO.getSetoffDuty(store_id, dateNow); //with setoff state
    //         dutyJsonList.forEach(duty => {
    //             let dutyId = duty.dutyId;
    //             let driverName = await DriverDAO.getNameById(duty.driverId);
    //             let assistantName = await DriverAssistentDAO.getNameById(duty.assistantId);
    //             let truckNumber = duty.truckNumber;
                
    //             const timeSlotJson = await TimeSlotDAO.readOneEntity(duty.timeSlotId);
    //             let timeSlot = timeSlotJson.time;
    //             var OneDuty = { dutyId, timeSlot, driverName, assistantName, truckNumber };
    //             dutyList.push(OneDuty);

    //         });
    //         return dutyList;
    //         // [
    //         //     {
    //         //         duty_id: 1,
    //         //         timeSlot:10:30:00,
    //         //         driver_name:Kamal,
    //         //         assistant_name:Vimal,
    //         //         truck_number:NB30-3737                   
    //         //     },
    //         //     ..........
    //         // ]

    //     } catch (error) {

    //     }
    // }


    // async markDutyFinished(duty_id) {
    //     try {

    //         var status = "Arrived";
    //         var timeNote = "10:30:12" //get current time 

    //         await DutyRecordDAO.markDutyFinished(duty_id, status, timeNote);

    //         //release driver/assistant/truck
    //         return "Mark as finished"


    //     } catch (error) {

    //     }
    // }


    // async releaseDriver(driver_id) {
    //     try {

    //     } catch (error) {

    //     }
    // }

    // async releaseAssistant(assistant_id) {
    //     try {

    //     } catch (error) {

    //     }
    // }

    // async releaseTruck(truck_number) {
    //     try {

    //     } catch (error) {

    //     }
    // }




    //mark driver/assistent/truck arrival
}

module.exports = StorekeeperService;
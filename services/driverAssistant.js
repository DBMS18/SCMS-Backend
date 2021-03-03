const DriverAssistentDAO = require("../models/dao/driverAssistentDAO.js");
class DriverAssistant {
    constructor() {

    }

    async getOrderList(user_id) { 
        try {
            var orderList = await DriverAssistentDAO.getOrdersOnDuty(user_id);

            return orderList;

        } catch (error) {

        }

    }

    async markOrderDelivering(order_id) {
        try {
            var response = await DriverAssistentDAO.markOrderDelivering(order_id);
            if (response != null) {
                return false
            }
            return true;


        } catch (error) {

        }

    }


    }
module.exports= DriverAssistant;

const DriverAssistentDAO = require("../models/dao/driverAssistantDAO");
class DriverAssistant {
    constructor() {

    }

    async getOrdersOnDuty(user_id) { 
        try {
            console.log("daservice")
            var orderList = await DriverAssistentDAO.getOrdersOnDuty(user_id);

            return orderList;

        } catch (error) {

        }

    }

    async markOrderDelivering(order_id) {
        try {
            var response = await DriverAssistentDAO.markOrderDelivering(order_id);
            if (response != null) {
                return false;
            }
            return true;


        } catch (error) {

        }

    }


    }
module.exports= DriverAssistant;

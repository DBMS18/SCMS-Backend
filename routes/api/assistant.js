const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/auth');
const driverAssistantController = require('../../controllers/driverAssistantController');


//assistant routes
router.get('/get-orders', authorization, driverAssistantController.getOrdersOnDuty);
router.get('/mark-delivery/:orderId', authorization, driverAssistantController.markDelivering);


module.exports = router;
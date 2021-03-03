const express = require('express');
const router = express.Router();

//const authorization = require('../../middlewares/auth');

const storekeeperController = require('../../controllers/storekeeperController');

//---------------storekeeperController routes-------------------

// router.get('/api/storekeeper', authorization,storekeeperController.renderDashboard); // get store keeper dashboard  -     not

//router.get('/order-reception/:user_id', storekeeperController.orderSendByManager);// authorization should add
//tharinda
router.get('/order-reception', storekeeperController.orderSendByManager);// authorization should add
router.get('/order-received',storekeeperController.orderReceivedByStorekeeper);
router.get('/login-info',storekeeperController.getLoginInfo);
router.post('/order-stored',storekeeperController.markOrderReceived);

router.get('/available-routes/:user_id', storekeeperController.getAvailableRoutes);

router.get('/available-drivers/:user_id', storekeeperController.getAvailableDrivers);
router.get('/available-assistant/:user_id', storekeeperController.getAvailableAssistants);
router.get('/available-trucks/:user_id', storekeeperController.getAvailableTrucks);


router.post('/create-duty',storekeeperController.createDutyRecord);

router.get('/received-orders/:user_id/:route_id',storekeeperController.getReceviedOrdersFromStore);

router.post('/order-markas-send',storekeeperController.markAsSendForDelivering);

router.get('/duty-set-off/:user_id',storekeeperController.getDutySetOff)
// router.post('/duty-finished',storekeeperController.markDutyFinished)

// router.get('/test/:user_id', storekeeperController.mockFunctions) // authorization should add






module.exports = router;
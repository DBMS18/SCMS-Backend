const express = require('express');
const router = express.Router();

const authorization = require('../../middlewares/auth');

const storekeeperController = require('../../controllers/storekeeperController');

//---------------storekeeperController routes-------------------

// router.get('/api/storekeeper', authorization,storekeeperController.renderDashboard); // get store keeper dashboard  -     not

router.get('/order-reception', authorization, storekeeperController.orderSendByManager);// authorization should add
router.get('/order-received', authorization, storekeeperController.orderReceivedByStorekeeper);
router.get('/login-info', authorization, storekeeperController.getLoginInfo);
router.post('/order-stored', authorization, storekeeperController.markOrderReceived);

router.get('/available-routes/', authorization, storekeeperController.getAvailableRoutes);

router.get('/available-drivers/', authorization, storekeeperController.getAvailableDrivers);
router.get('/available-assistant/', authorization, storekeeperController.getAvailableAssistants);
router.get('/available-trucks/', authorization, storekeeperController.getAvailableTrucks);


router.post('/create-duty', authorization, storekeeperController.createDutyRecord);

router.get('/received-orders/:user_id/:route_id',storekeeperController.getReceviedOrdersFromStore);

router.post('/order-markas-send',storekeeperController.markAsSendForDelivering);

router.get('/duty-set-off', authorization, storekeeperController.getDutySetOff)
router.post('/duty-finished', authorization, storekeeperController.markDutyFinished)

// router.get('/test/:user_id', storekeeperController.mockFunctions) // authorization should add






module.exports = router;
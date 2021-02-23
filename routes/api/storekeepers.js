const express = require('express');
const router = express.Router();

//const authorization = require('../../middlewares/auth');

const storekeeperController = require('../../controllers/storekeeperController');

//---------------storekeeperController routes-------------------

// router.get('/api/storekeeper', authorization,storekeeperController.renderDashboard); // get store keeper dashboard  -     not

router.get('/order-reception/:user_id', storekeeperController.orderSendByManager);// authorization should add
router.post('/order-received',storekeeperController.orderReceviedToStore);

router.get('/available-routes/:user_id', storekeeperController.getAvailableRoutes);

router.get('/available-drivers/:user_id', storekeeperController.getAvailableDrivers);
router.get('/available-assistant/:user_id', storekeeperController.getAvailableAssistants);
// router.get('available-trucks/:user_id', authorization, storekeeperController.getAvailableTrucks);


router.post('/create-duty',storekeeperController.createDutyRecord);

router.get('/received-orders/:user_id/:route_id',storekeeperController.getReceviedOrdersFromStore);

router.post('/order-markas-send',storekeeperController.markAsSendForDelivering);







module.exports = router;
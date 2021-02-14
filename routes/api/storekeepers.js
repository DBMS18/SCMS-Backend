const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/auth');

const storekeeperController = require('../../controllers/storekeeperController');

//storekeeperController routes
router.get('/api/storekeeper', authorization); // get store keeper dashboard

router.get('/api/storekeeper/order-reception/:store_id', authorization, storekeeperController.orderSendByManager);
router.post('/api/storekeeper/order-received', authorization,storekeeperController.orderReceviedToStore);

router.get('/api/storekeeper/received-orders/:store_id', authorization, storekeeperController.getReceviedOrdersFromStore);
router.post('/api/storekeeper/order-markas-send', authorization,storekeeperController.markAsSendForDelivering);

router.post('/api/storekeeper/create-duty', authorization,storekeeperController.createDutyRecord);

router.get('/api/storekeeper/available-drivers/:store_id', authorization, storekeeperController.getAvailableDrivers);
router.get('/api/storekeeper/available-assistant/:store_id', authorization, storekeeperController.getAvailableAssistants);
router.get('/api/storekeeper/available-trucks/:store_id', authorization, storekeeperController.getAvailableTrucks);

router.get('/api/storekeeper/time-slot', authorization, storekeeperController.getTimeSlots);

router.get('/api/storekeeper/setoff-duty/:store_id', authorization, storekeeperController.getSetOffDutyList);

router.post('/api/storekeeper/mark-duty-finished', authorization,storekeeperController.markDutyFinished);




module.exports = router;
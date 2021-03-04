
const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/auth');

const managerController = require('../../controllers/managerController');
//user routes
router.get('/dashboard/:user_id', managerController.dashboardDetails); //OK

router.get('/assign-goods', authorization, managerController.getAllOrders_Trains); //ok
router.post('/assign-goods',authorization, managerController.addTrainOrderRecord);  //OK

router.get('/trains-list',authorization,managerController.getAllTrains); //OK


router.get('/assigned-goods',authorization, managerController.getAllRecords); //ok
router.post('/assigned-goods/', authorization,managerController.updateTrainOrderRecord);//ok
router.delete('/assigned-goods/:id',authorization, managerController.removeTrainOrderRecord);//ok

module.exports = router;

const express = require('express');
const router = express.Router();
//const authorization = require('../../middlewares/auth');

const managerController = require('../../controllers/managerController');
//user routes
router.get('/dashboard/:user_id', managerController.dashboardDetails); //OK

router.get('/assign-goods', managerController.getAllOrders_Trains); //ok
router.post('/assign-goods', managerController.addTrainOrderRecord);  //OK




router.get('/assigned-goods', managerController.getAllRecords); //ok
router.put('/assigned-goods/:id', managerController.updateTrainOrderRecord);//ok
router.delete('/assigned-goods/:id', managerController.removeTrainOrderRecord);//ok

module.exports = router;
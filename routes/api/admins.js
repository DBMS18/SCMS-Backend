const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');

router.get('/most-order', adminController.itemsWithMostOrders);
router.get('/customer-order-report', adminController.customerOrderReport);
router.get('/sales-report', adminController.salesReport);
router.get('/driver-Working', adminController.driverWorkedHours);
router.get('/assistant-Working', adminController.assistantWorkedHours);
router.get('/truck-Working', adminController.truckWorkedHours);
router.get('/quarterlySales-report', adminController.quarterlySalesReport);
module.exports = router;
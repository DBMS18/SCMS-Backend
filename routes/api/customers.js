const express = require('express');
const router = express.Router();

//const authorization = require('../../middlewares/auth');

const customerController = require('../../controllers/customerController.js');

//customerController routes



router.get('/get-products', customerController.getProductList);
router.get('/get-routes',  customerController.getRouteList);
router.post('/api/cutomer/checkout-cart', customerController.checkOutMyCart); // should check


router.get('/get-orders/:customer_id', customerController.getMyOrderList);
router.get('/api/customer/mark-delivery/:customer_id/:order_id', customerController.markDelivering);



module.exports = router;
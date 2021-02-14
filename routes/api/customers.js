const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/auth');

const customerController = require('../../controllers/customerController.js');

//customerController routes
router.get('/api/customer', authorization); // get customer dashboard

router.get('/api/customer/get-products', authorization, customerController.getProductList);
router.post('/api/cutomer/checkout-cart', authorization,customerController.checkOutMyCart);


router.get('/api/customer/get-orders/:customerId', authorization, customerController.getMyOrderList);
router.get('/api/customer/mark-delivery/:customerId/:orderId', authorization, customerController.markDelivering);






module.exports = router;
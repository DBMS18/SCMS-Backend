const express = require('express');
const router = express.Router();

const authorization = require('../../middlewares/auth');

const customerController = require('../../controllers/customerController.js');

//customerController routes
router.get(''); // get customer dashboard

router.get('/get-products',  customerController.getProductList);
router.get('/get-routes', customerController.getRouteList);
router.post('/checkout-cart',customerController.checkOutMyCart);
router.get('/get-orders/:customerId/:status',customerController.getMyOrderList);
router.put('/mark-delivery/:customerId/:orderId', customerController.markDelivering);

module.exports = router;
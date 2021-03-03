const express = require('express');
const router = express.Router();

const authorization = require('../../middlewares/auth');

const customerController = require('../../controllers/customerController.js');

//customerController routes
router.get('', authorization, customerController.authCustomer); // get customer dashboard

router.get('/get-products', authorization, customerController.getProductList);
router.get('/search-products', authorization, customerController.searchProductList);
router.get('/get-routes', authorization, customerController.getRouteList);
router.post('/checkout_cart', authorization, customerController.checkOutMyCart);


router.get('/get-orders/:status', authorization, customerController.getMyOrderList);
router.put('/mark-delivery/:orderId', authorization,  customerController.markDelivering);



module.exports = router;
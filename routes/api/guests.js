const express = require('express');
const router = express.Router();

const guestController = require('../../controllers/guestController');
const customerController = require('../../controllers/customerController.js');

//guest routes
router.get('/get-products',  customerController.getProductList);
router.get('/search-products',  customerController.searchProductList);
router.post('/registration', guestController.createAccount);
router.get('/auth/login', guestController.login);

module.exports = router;
const express = require('express');
const router = express.Router();

// All routes of User
const storekeepers = require('./api/storekeepers');
const customers = require('./api/customers');
const guests = require('./api/guests');
const managerRoutes = require('./api/manager');
const assistantRoutes = require('./api/assistant');
const adminRoutes = require('./api/admins');


console.log("model index call");

//storekeeper routes
router.use('/storekeeper', storekeepers);

// customer routes
router.use('/customer', customers);

// guests routes
router.use('/guests', guests);

//manager routes
router.use('/manager', managerRoutes);

//assistant routes
router.use('/assistant', assistantRoutes);

//admin routes
router.use('/admin', adminRoutes);

module.exports = router;

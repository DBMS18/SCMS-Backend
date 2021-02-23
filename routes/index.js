const express = require('express');
const router = express.Router();

// All routes of User
const storekeepers = require('./api/storekeepers');
const customers = require('./api/customers');

console.log("model index call");

//storekeeper routes
router.use('/storekeeper', storekeepers);

// customer routes
router.use('/customer', customers);

// //user event routes
// router.use('/events', userRoutes);

// //user event membership routes
// router.use('/memberships', userRoutes);

module.exports = router;

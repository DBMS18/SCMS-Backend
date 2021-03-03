const express = require('express');
const router = express.Router();

// All routes of Manager
const managerRoutes = require('./api/manager');

//manager routes
router.use('/manager', managerRoutes);

// //user event routes
// router.use('/events', userRoutes);

// //user event membership routes
// router.use('/memberships', userRoutes);

module.exports = router;

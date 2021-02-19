

const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/auth');

const userController = require('../../controllers/userController');

//user routes
// router.get('/users/', authorization, userController.searchUser);
// router.post('/users/skills/add', authorization, userController.addSkill);
// router.delete('/users/skills/:id', authorization, userController.removeSkill);
// router.put('/users/skills/:id', authorization, userController.validateSkill);

module.exports = router;
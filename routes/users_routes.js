const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth_controller');
const userValidationRules = require('../validation/user');

router.get('/', userController.getProfile);



module.exports = router;
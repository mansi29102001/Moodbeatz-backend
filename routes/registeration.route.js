const router = require("express").Router();
const mongoose = require('mongoose');
const registerController = require('../controllers/registeration.controller');

router.post('/newRegister', registerController.registerUser);

module.exports = router;
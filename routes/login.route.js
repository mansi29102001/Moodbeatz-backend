const router = require("express").Router();
const mongoose = require('mongoose');
const loginController = require('../controllers/login.controller');

router.post('/loginDetails', loginController.loginUser);

module.exports=router;
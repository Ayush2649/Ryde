const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
    body('fullname.firstname').isLength({min: 2}).withMessage('First name must be atleast 2 characters long'),
],
    userController.registeruser
);

module.exports = router;
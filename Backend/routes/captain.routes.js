const captainController = require('../controllers/captain.controller');
const express = require("express");
const router = express.Router();
const {body} = require('express-validator');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min: 6}).withMessage('Password must be atleast 6 characters long'),
    body('fullname.firstname').isLength({min: 2}).withMessage('First name must be atleast 2 characters long'),
    body('vehicle.color').isLength({min: 2}).withMessage('Color must be atleast 2 characters long'),
    body('vehicle.plate').isLength({min: 2}).withMessage('Plate must be atleast 2 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid Vehicle Type'),
],
    captainController.registerCaptain 
);

module.exports = router;
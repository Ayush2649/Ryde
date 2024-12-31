const captainModel = require('../models/captain.model'); 
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const blacklistedTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { fullname, email, password, vehicle } = req.body;
  
      if (!vehicle || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        return res.status(400).json({ error: 'Vehicle details are incomplete' });
      }
  
      const isCaptainExist = await captainModel.findOne({ email });
      if (isCaptainExist) {
        return res.status(400).json({ error: 'Captain already exists' });
      }
  
      const hashedPassword = await captainService.hashPassword(password);
  
      const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
      });
  
      const token = captain.generateAuthToken();
      res.status(201).json({ token, captain });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');

    if(!captain) {
        return res.status(400).json({error: "Invalid Email or Password"});
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch) {
        return res.status(400).json({error: "Invalid Email or Password"});
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token, captain});
};

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({captain: req.captain});
};
  
module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    await blacklistedTokenModel.create({token});
    
    res.clearCookie('token');
    
    res.status(200).json({message: "Logged out successfully"});
};
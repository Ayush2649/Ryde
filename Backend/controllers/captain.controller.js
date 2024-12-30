const captainModel = require('../models/captain.model'); 
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');

// module.exports.registerCaptain = async (req, res) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             return res.status(400).json({errors: errors.array()});
//         }

//         const { firstname, lastname, email, password, vehicle } = req.body;

//         const isCaptainExist = await captainModel.findOne({email});

//         if(isCaptainExist) {
//             return res.status(400).json({error: "Captain already exists"});
//         }

//         const hashedPassword = await captainService.hashPassword(password);

//         const captain = await captainService.createCaptain({
//             firstname,
//             lastname,
//             email,
//             password: hashedPassword,
//             color: vehicle.color,
//             plate: vehicle.plate,
//             capacity: vehicle.capacity,
//             vehicleType: vehicle.vehicleType,
//         });

//         const token = captain.generateAuthToken();

//         res.status(201).json({token, captain});
// }

module.exports.registerCaptain = async (req, res) => {
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
  
const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, pickup, destination, vehicleType } = req.body;

    try {
        // Create ride
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });

        // Get coordinates of the pickup location
        const pickUpCoordinates = await mapService.getAddressCoordinate(pickup);
        console.log(pickUpCoordinates);

        // Get captains in the radius
        const captainsInRadius = await mapService.getCaptainsInTheRadius();

        // Send the response after all operations are complete
        return res.status(201).json({ ride, pickUpCoordinates, captainsInRadius });
    } catch (error) {
        console.error("Error creating ride:", error);
        return res.status(500).json({ message: 'Failed to create ride' });
    }
};


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { pickup, destination } = req.query;
    try {
        const fare = await rideService.getfare(pickup, destination);
        return res.status(200).json({ fare });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to get fare' });
    }   
}
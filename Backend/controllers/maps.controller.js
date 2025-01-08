const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.json({ address, coordinates });
    } catch (error) {
        res.status(400).json({ error: `Error fetching coordinates: ${error.message}` });
    }
};

module.exports.getDistanceTime = async (req, res) => {
    try{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await mapService.getDistanceTime(origin, destination);

        res.status(200).json({ distanceTime });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports.getAutoCompleteSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json({ suggestions });
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Internal server error'});
    }
}
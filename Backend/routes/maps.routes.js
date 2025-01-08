const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/maps.controller');
const { query } = require('express-validator');

router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates // Use the specific method
);

router.get('/get-distance-time',
    query('origin').isString().isLength({min : 3}),
    query('destination').isString().isLength({min : 3}),
    authMiddleware.authUser,
    mapController.getDistanceTime // Use the specific method
);

router.get('/get-suggestions',
    query('input').isString().isLength({min : 3}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions // Use the specific method
)

module.exports = router;

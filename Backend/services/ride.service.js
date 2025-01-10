const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getfare(pickup, destination) {
    if(!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {  
        car: 50,
        auto: 30,
        moto: 20
    };

    const perKmRate = {
        car: 15,
        auto: 10,
        moto: 8
    };

    const perMinuteRate = {
        car: 3,
        auto: 2,
        moto: 1.5
    }

    const fare = {
        car: baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car),
        auto: baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto),
        moto: baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto)
    };

    return fare;
}

module.exports.getfare = getfare;

function getOtp(num) {
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('User, pickup, destination and vehicleType are required');
    }

    const fare = await getfare(pickup, destination);

    const ride = rideModel.create({
        user, 
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    })

    return ride
}


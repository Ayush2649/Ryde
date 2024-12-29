const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    // Log incoming headers
    console.log("Request Headers: ", req.headers);

    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized - Token missing" });
    }

    const isBlacklisted = await userModel.findOne({token: token});

    if(isBlacklisted){
        return res.status(401).json({message: 'Unauthorized - Token blacklisted'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Error in auth middleware: ", err);
        return res.status(401).json({ message: "Unauthorized - Token invalid" });
    }
};

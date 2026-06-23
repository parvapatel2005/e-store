const jwt = require('jsonwebtoken');
const User = require('../model/user.js');

const protect = async (req, res, next) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        console.log("Token from header:", token);

        if(!token){
            return res.status(401).json({success: false, message: "Invalid token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.userId);
        next();
    }catch(error){
        return res.status(401).json({success: false, message: "Invalid token" });
    }
}

const isAdmin = (req, res, next) => {
    // Check if req.user exists before checking the role
    if(!req.user || req.user.role !== 'admin'){
        return res.status(403).json({success: false, message: "Admin Access Only" });
    }
    next();
}

module.exports = { protect, isAdmin };
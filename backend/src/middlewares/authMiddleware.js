const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.authToken;
            if (!token) {
                return res.status(401).json({ message: 'Access denied. No token provided.' });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] } 
            });

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access forbidden: insufficient permissions.' });
            }
            next();
        } catch (error) {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    };
};

const isAdmin = authMiddleware(['System Administrator']);

const isStoreOwner = authMiddleware(['Store Owner']);

module.exports = {
    authMiddleware,
    isAdmin,
    isStoreOwner,
};
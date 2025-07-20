import { user } from '../model/user.model.js';
import jwt from 'jsonwebtoken';

export const authentication = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token && req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'User not logged in' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foundUser = await user.findById(decoded._id);
        if (!foundUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = foundUser;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }

        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

import { user } from '../model/user.model.js';
import jwt from 'jsonwebtoken'
export const authentication = async(req, res, next) => {
    try {
        const {
            token
        } = req.cookies;
        if (!token)
            res.status(401).json({
                message: 'User not logged in'
            })
        else {
            const decode_token = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await user.findById(decode_token._id);
            next();
        }

    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }

}
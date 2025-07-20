import jwt from 'jsonwebtoken';
import { activeUSer } from '../model/activeUser.model.js';

export const sendCookie = async (jwtSecret, user, res, message) => {
    const token = jwt.sign(
        { _id: user._id, email: user.email },
        jwtSecret,
        { expiresIn: '1m' }
    );

    const refreshToken = jwt.sign(
        { email: user.email },
        jwtSecret,
        { expiresIn: '7d' }
    );

    await activeUSer.findOneAndUpdate(
        { email: user.email },
        { refreshToken, loggedAt: new Date() },
        { upsert: true, new: true }
    );

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1 * 60 * 1000,
        sameSite: 'none',
        secure: true,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
    });

    res.status(201).json({
        status: true,
        message,
        user: {
            name: user.name,
            email: user.email
        }
    });
};

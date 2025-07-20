import bcrypt from 'bcrypt';
import { user } from '../model/user.model.js';
import { sendCookie } from '../utils/feature.js';
import jwt from 'jsonwebtoken';
import { activeUSer } from '../model/activeUser.model.js';

export const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password
        } = req.body;

        const existingUser = await user.findOne({
            email
        });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user_data = await user.create({
            name,
            email,
            password: hashedPassword,
        });

        sendCookie(process.env.JWT_SECRET, user_data, res, 'Registration Complete');
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const user_data = await user.findOne({
            email
        });
        if (!user_data) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const passwordMatch = bcrypt.compare(password, user_data.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const isAlreadyLoggedIn = await activeUSer.findOne({ email })
        if (isAlreadyLoggedIn) {
            return res.status(200).json({
                message: "User already logged in on another device"
            })
        }
        else {
            sendCookie(process.env.JWT_SECRET, user_data, res, `User ${user_data.name} logged in successfully`);
        }


    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

export const userDetails = (req, res) => {
    res.status(201).json({
        success: true,
        details: {
            name: req.user.name,
            email: req.user.email
        }
    })
}

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        res.clearCookie("token", {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });

        if (refreshToken) {
            await activeUSer.deleteOne({ refreshToken });
        }

        return res.status(200).json({
            message: "User logged out successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Logout failed",
            error: error.message
        });
    }
};

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token found' });
        }

        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const active = await activeUSer.findOne({ email: decoded.email });

        if (!active || active.refreshToken !== refreshToken) {
            return res.status(403).json({ message: 'Refresh token is invalid or expired. Login again' });
        }

        const existingUser = await user.findOne({ email: decoded.email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newAccessToken = jwt.sign(
            { _id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1m' }
        );

        res.cookie('token', newAccessToken, {
            httpOnly: true,
            maxAge: 1 * 60 * 1000,
            sameSite: 'none',
            secure: true,
        });

        res.status(200).json({ message: 'New access token issued' });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Refresh token expired' });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
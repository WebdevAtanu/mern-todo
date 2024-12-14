import jwt from 'jsonwebtoken';
export const sendCookie = (jwtSecret, user, res, message) => {
    let token = jwt.sign({
        _id: user._id
    }, jwtSecret);
    res.status(201)
        .cookie('token', token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
            sameSite: 'none',
            secure: true
        })
        .json({
            status: true,
            message: message,
            user: {
                name: user.name,
            },
        });
}
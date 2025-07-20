import express from 'express';
import { registerUser, loginUser, userDetails, logout, refreshAccessToken } from '../controller/user.controller.js'
import { authentication } from '../middleware/auth.js';
const user_router = express.Router();

user_router.get('/', (_, res) => {
    res.send('server working');
})

user_router.post('/user/new', registerUser);
user_router.post('/user/login', loginUser);
user_router.get('/user/details', authentication, userDetails);
user_router.post('/user/refreshtoken', refreshAccessToken);
user_router.get('/user/logout', logout);
export default user_router;
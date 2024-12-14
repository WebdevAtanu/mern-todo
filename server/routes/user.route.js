import express from 'express';
import {registerUser,loginUser,userDetails,logout} from '../controller/user.controller.js'
import {authentication} from '../middleware/auth.js';
const router=express.Router();

router.get('/', (_, res) => {
    res.send('server working');
})

router.post('/user/new', registerUser);
router.post('/user/login', loginUser);
router.get('/user/details', authentication, userDetails);
router.get('/user/logout', logout);
export default router;
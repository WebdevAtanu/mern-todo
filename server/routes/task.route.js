import express from 'express';
import {authentication} from '../middleware/auth.js';
import {addTask,getTask,updateTask,deleteTask} from '../controller/task.controller.js';

const router = express.Router();
router.post('/task/add', authentication, addTask);
router.get('/task/mytask', authentication, getTask);
router.route('/task/:id').put(authentication, updateTask).delete(authentication, deleteTask);
export default router;
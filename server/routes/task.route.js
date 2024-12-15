import express from 'express';
import {authentication} from '../middleware/auth.js';
import {addTask,getTask,updateTask,deleteTask} from '../controller/task.controller.js';

const task_router = express.Router();
task_router.post('/task/add', authentication, addTask);
task_router.get('/task/mytask', authentication, getTask);
task_router.route('/task/:id').put(authentication, updateTask).delete(authentication, deleteTask);
export default task_router;
import express from 'express';
import user_router from './routes/user.route.js'
import task_router from './routes/task.route.js'
import cookieParser from 'cookie-parser';
import {config} from 'dotenv';
import cors from 'cors';

const app = express();
config({
    path: './config.env'
})
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.LOCAL_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.urlencoded({
    extended: true
}));
app.use(user_router);
app.use(task_router);

export default app;
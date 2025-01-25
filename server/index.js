import express from'express';
import connectDB from './config/db.js';
// import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// const limiter = rateLimit({
//     windowMs : 15 * 60 * 1000,
//     limit: 100,
// 	standardHeaders: 'draft-7', 
// 	legacyHeaders: false,
//     message : {
//         code : 429,
//         message : "Too many requests, try again later"
//     } 
// })

// app.use(limiter);
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({ limit : "5MB" }));
app.use(cookieParser());
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))

app.use('/', (req, res, next) => {
    const date = new Date();
    console.log(`Request log for url : ${req.url} method : ${req.method} at ${date.toLocaleString()}`);
    next();
}) 

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(PORT , async() => {
    console.log(`Server is listening on port ${PORT}`);
    await connectDB();
})
import express from 'express';
import connectDB from './config/db.js';
// import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
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
app.use(express.json({ limit: "5MB" }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import courseRouter from './routes/course.route.js';
import lectureRouter from './routes/lecture.route.js';
import paymentRouter from './routes/payment.route.js';
import moduleRouter from './routes/module.route.js';

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/lectures', lectureRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/modules', moduleRouter);

connectDB().then(() => {
    app.listen(PORT, async () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}).catch((err) => {
    console.log(`Error connecting to DB`, err.message);
    process.exit(1);
})
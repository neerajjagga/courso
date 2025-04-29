import express from 'express';
import connectDB from './config/db.js';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { aj } from './lib/arcjet.js'
import { isSpoofedBot } from "@arcjet/inspect";

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10MB" }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173', process.env.FRONTEND_DEPLOYED_URL],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import courseRouter from './routes/course.route.js';
import lectureRouter from './routes/lecture.route.js';
import paymentRouter from './routes/payment.route.js';
import moduleRouter from './routes/module.route.js';
import userCourseProgressRouter from './routes/userCourseProgress.route.js';

app.use("/", async (req, res, next) => {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return res.status(429).json({ error: "Too Many Requests" });
        } else if (decision.reason.isBot()) {
            return res.status(403).json({ error: "No bots allowed" });
        } else {
            return res.status(403).json({ error: "Forbidden" });
        }
    } else if (decision.results.some(isSpoofedBot)) {
        return res.status(403).json({ error: "Forbidden" });
    } else {
        return next();
    }
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/lectures', lectureRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/modules', moduleRouter);
app.use('/api/progress', userCourseProgressRouter);

connectDB().then(() => {
    app.listen(PORT, async () => {
        console.log(`Server is listening on port ${PORT}`);
    })
}).catch((err) => {
    console.log(`Error connecting to DB`, err.message);
    process.exit(1);
});
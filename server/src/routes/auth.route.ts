import express, { Router } from 'express';
import {
    signUpUser,
    loginUser,
    logoutUser,
    sendVerificationCode,
    verifyVerificationCode,
} from '../controllers/auth.controller.js';
import {
    validateSignUpData,
} from '../middlewares/user.middleware.js';
import {
    checkAuth,
} from '../middlewares/user.middleware.js';

const authRouter: Router = express.Router();

authRouter.post('/signup', validateSignUpData, signUpUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);

authRouter.post('/send-otp', checkAuth, sendVerificationCode);
authRouter.post('/verify-otp', checkAuth, verifyVerificationCode);

export default authRouter;
import express from 'express';
import {
    signUpUser,
    loginUser,
    logoutUser,
    refreshTokens,
    sendVerificationCode,
    verifyVerificationCode,
} from '../controllers/auth.controller.js';
import {
    validateSignUpData,
} from '../middlewares/user.middleware.js';
import {
    checkAuth,
} from '../middlewares/user.middleware.js';

const authRouter = express.Router();

authRouter.post('/signup', validateSignUpData, signUpUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.post('/refresh-token', refreshTokens);

authRouter.post('/send-otp', checkAuth, sendVerificationCode);
authRouter.post('/verify-otp', checkAuth, verifyVerificationCode);

export default authRouter;

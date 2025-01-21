import express from 'express';
import {
    signUpUser,
    loginUser,
    logoutUser,
    refreshTokens,
} from '../controllers/auth.controller.js';
import {
    validateSignUpData,
} from '../middlewares/user.middleware.js';

const authRouter = express.Router();

authRouter.post('/signup', validateSignUpData, signUpUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.post('/refresh-token', refreshTokens);

export default authRouter;

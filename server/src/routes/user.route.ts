import express, { Router } from 'express';
import {
    getUserProfile,
    editUserProfile
} from '../controllers/user.controller.js';
import {
    checkAuth,
    validateEditProfileData
} from '../middlewares/user.middleware.js';

const userRouter: Router = express.Router();

userRouter.get('/', checkAuth, getUserProfile);
userRouter.patch('/profile', checkAuth, validateEditProfileData, editUserProfile);

export default userRouter;

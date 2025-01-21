import express from 'express';
import {
    getUserProfile,
    editUserProfile
} from '../controllers/user.controller.js';
import { 
    checkAuth,
    validateEditProfileData
} from '../middlewares/user.middleware.js';

const userRouter = express.Router();

userRouter.get('/profile', checkAuth, getUserProfile);
userRouter.patch('/profile', checkAuth, validateEditProfileData, editUserProfile);

export default userRouter;

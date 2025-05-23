import express, { Router } from 'express';
import {
    checkAuth
} from '../middlewares/user.middleware.js';
import {
    updateUserCourseProgress
} from '../controllers/userCourseProgress.controller.js';

const userCourseProgressRouter: Router = express.Router();

userCourseProgressRouter.patch('/:courseId/lecture/:lectureId', checkAuth, updateUserCourseProgress);

export default userCourseProgressRouter;
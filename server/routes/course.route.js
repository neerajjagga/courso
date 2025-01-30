import express from 'express';
import {
    checkAuth,
    checkInstructor
} from '../middlewares/user.middleware.js';
import {
    createCourse,
    getMyCourses,
    getAllCourses,
    getSingleCourse,
} from './../controllers/course.controller.js';
import { validateCourseData } from './../middlewares/course.middleware.js';

const courseRouter = express.Router();

courseRouter.post('/', checkAuth, checkInstructor, validateCourseData, createCourse);
courseRouter.get('/', getAllCourses);
courseRouter.get('/me', checkAuth, checkInstructor, getMyCourses);
courseRouter.get('/:titleSlug', getSingleCourse);

// courseRouter.patch('/', checkAuth, checkInstructor, editCourse);
// courseRouter.delete('/', checkAuth, checkInstructor, deleteCourse);

export default courseRouter;

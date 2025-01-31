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
    deleteCourse,
    updateCourse,
} from './../controllers/course.controller.js';
import { validateCourseData } from './../middlewares/course.middleware.js';

const courseRouter = express.Router();

courseRouter.post('/', checkAuth, checkInstructor, validateCourseData, createCourse);
courseRouter.get('/', getAllCourses);
courseRouter.get('/me', checkAuth, checkInstructor, getMyCourses);
courseRouter.get('/:titleSlug', getSingleCourse);

courseRouter.patch('/:courseId', checkAuth, checkInstructor, validateCourseData, updateCourse);
courseRouter.delete('/:courseId', checkAuth, checkInstructor, deleteCourse);

export default courseRouter;

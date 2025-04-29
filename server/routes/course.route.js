import express from 'express';
import {
    checkAuth,
    checkInstructor
} from '../middlewares/user.middleware.js';
import {
    createCourse,
    getMyEnrolledCourses,
    getMyCreatedCourses,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
    getSingleEnrolledCourse
} from './../controllers/course.controller.js';
import {
    validateCourseData,
    validateUpdateCourseData
} from './../middlewares/course.middleware.js';

const courseRouter = express.Router();

courseRouter.post('/', checkAuth, checkInstructor, validateCourseData, createCourse);

courseRouter.get('/', checkAuth, getAllCourses);

courseRouter.get('/me/enrolled', checkAuth, getMyEnrolledCourses);
courseRouter.get('/me/enrolled/:titleSlug', checkAuth, getSingleEnrolledCourse);

courseRouter.get('/me/created', checkAuth, checkInstructor, getMyCreatedCourses);

courseRouter.get('/:titleSlug', checkAuth, getSingleCourse);

courseRouter.patch('/:courseId', checkAuth, checkInstructor, validateUpdateCourseData, updateCourse);
courseRouter.delete('/:courseId', checkAuth, checkInstructor, deleteCourse);

export default courseRouter;
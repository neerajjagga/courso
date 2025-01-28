import express from 'express';
import { 
    checkAuth, 
    checkInstructor 
} from '../middlewares/user.middleware.js';
import { 
    createCourse,
    getMyCourses,
} from './../controllers/course.controller.js';
import { validateCourseData } from './../middlewares/course.middleware.js';

const courseRouter = express.Router();

courseRouter.post('/', checkAuth, checkInstructor, validateCourseData, createCourse);
courseRouter.get('/me', checkAuth, checkInstructor, getMyCourses);

// courseRouter.patch('/', checkAuth, checkInstructor, editCourse);
// courseRouter.delete('/', checkAuth, checkInstructor, deleteCourse);

export default courseRouter;

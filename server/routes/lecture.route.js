import express from 'express';
import { checkInstructor, checkAuth } from '../middlewares/user.middleware.js';
import { validateLectureData } from '../validators/lecture.validator.js';
import { createLecture, getLectures, updateLecture, deleteLecture } from '../controllers/lecture.controller.js';

const lectureRouter = express.Router();

lectureRouter.post('/:courseId', checkAuth, checkInstructor, validateLectureData, createLecture);
lectureRouter.get('/:courseId', checkAuth, getLectures);
lectureRouter.patch('/:lectureId', checkAuth, checkInstructor, validateLectureData, updateLecture);
lectureRouter.delete('/:lectureId', checkAuth, checkInstructor, deleteLecture);

export default lectureRouter;
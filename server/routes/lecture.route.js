import express from 'express';
import {
    checkInstructor,
    checkAuth
} from '../middlewares/user.middleware.js';
import {
    validateLectureData,
    validateLectureUpdateData
} from '../middlewares/lecture.middleware.js';
import {
    createLecture,
    getSingleLecture,
    updateLecture,
    deleteLecture
} from '../controllers/lecture.controller.js';

const lectureRouter = express.Router();

lectureRouter.post('/', checkAuth, checkInstructor, validateLectureData, createLecture);
lectureRouter.get('/:lectureId', checkAuth, getSingleLecture);

lectureRouter.patch('/:lectureId', checkAuth, checkInstructor, validateLectureUpdateData, updateLecture);
lectureRouter.delete('/:lectureId', checkAuth, checkInstructor, deleteLecture);

export default lectureRouter;
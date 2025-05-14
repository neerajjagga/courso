import mongoose from "mongoose";
import { IEnrolledCourseDocument } from '../types/enrolledCourse.types';

const enrolledCoursesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
}, {
    timestamps: true
});

enrolledCoursesSchema.index({ userId: 1, courseId: 1 }, { unique: true });

const EnrolledCourseModel = mongoose.model<IEnrolledCourseDocument>("EnrolledCourse", enrolledCoursesSchema);

export default EnrolledCourseModel;
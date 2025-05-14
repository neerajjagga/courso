import { Document, Types } from "mongoose"

export interface EnrolledCourse {
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IEnrolledCourseDocument extends EnrolledCourse, Document { }

export interface CleanedEnrolledCourse extends EnrolledCourse {
    id: Types.ObjectId;
    course: Types.ObjectId;
    progressSummary?: any;
}
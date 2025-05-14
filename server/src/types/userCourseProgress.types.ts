import { Document, Types } from "mongoose";

export interface LectureProgress {
  lectureId: Types.ObjectId;
  isCompleted: boolean;
}

export interface ModuleProgress {
  moduleId: Types.ObjectId;
  lectures: LectureProgress[];
}

export interface UserCourseProgress {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  progress: ModuleProgress[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserCourseProgressDocument extends UserCourseProgress, Document {} 
import { Document, Types } from "mongoose"

export interface Comment {
    userId: Types.ObjectId;
    lectureId: Types.ObjectId;
    courseId: Types.ObjectId;
    message: string;
    upvoteCount: number;
    downvoteCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICommentDocument extends Comment, Document {}
import { Document, Types } from "mongoose"

export interface Review {
    message: string;
    rating: number;
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IReviewDocument extends Review, Document {}
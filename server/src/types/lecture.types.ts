import { Document, Types } from "mongoose"

export interface Lecture {
    title: string;
    titleSlug: string;
    description?: string;
    videoUrl?: string;
    isFreePreview?: boolean;
    moduleId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILectureDocument extends Lecture, Document { }

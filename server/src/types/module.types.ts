import { Document, Types } from "mongoose"
import { ILectureDocument } from "./lecture.types";

export interface Module {
    title: string;
    titleSlug: string;
    courseId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IModuleDocument extends Module, Document {
    lectures?: ILectureDocument[]
}
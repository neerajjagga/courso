import { Document, Types } from "mongoose"

export interface Module {
    title: string;
    titleSlug: string;
    courseId: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IModuleDocument extends Module, Document {}
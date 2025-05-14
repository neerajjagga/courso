import { Document, Types } from "mongoose"

type LevelType = "beginner" | "intermediate" | "expert" | "all";

export interface Course {
    title: string;
    titleSlug: string;
    subtitle?: string;
    description?: string;
    language: string;
    level: LevelType;
    courseImageUrl?: string;
    price: number;
    category: string;
    reviews: Types.ObjectId[];
    instructor: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICourseDocument extends Course, Document { }

interface Lecture {
    _id: Types.ObjectId;
    title: string;
    titleSlug: string;
    description: string;
    createdAt: Date;
    videoUrl: string;
}

interface Module {
    _id: Types.ObjectId;
    title: string;
    titleSlug: string;
    lectures: Lecture[];
}

interface Instructor {
    _id: Types.ObjectId;
    fullname: string;
    profileImageUrl?: string;
    bio?: string;
}

export interface PopulatedCourse {
    _id: Types.ObjectId;
    title: string;
    titleSlug: string;
    instructor: Instructor;
    modules: Module[];
}
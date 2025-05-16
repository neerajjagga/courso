import { Lecture } from "./lecture";

export interface Module {
    courseId: string;
    createdAt: string;
    id: string;
    lectures: Lecture[];
    title: string;
    titleSlug: string;
    updatedAt: string;
}

export interface LearningModule {
    id: string;
    lectures: Lecture[];
    title: string;
    titleSlug: string;
}
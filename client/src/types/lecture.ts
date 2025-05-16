
export interface Lecture {
    createdAt: string;
    description: string | null;
    id: string;
    moduleId: string;
    title: string;
    titleSlug: string;
    videoUrl: string | null;
    isFreePreview?: boolean;
}
import UserCourseProgress from '../models/userCourseProgress.model.js';

interface IProgressSummary {
    completedLectures: string[];
    totalLectures: number;
    percentage: number;
}

export const getUserCourseModuleWiseProgressSummary = async (courseId: string, userId: string): Promise<IProgressSummary[]> => {
    try {
        const courseProgress = await UserCourseProgress.findOne({
            courseId,
            userId,
        });

        if (!courseProgress) {
            throw new Error("CourseProgress not found");
        }

        const progressSummary = [];

        for (const mod of courseProgress.progress) {
            let completedLectures = [];
            let totalLectures = 0;
            let percentage = 0;

            for (const lec of mod.lectures) {
                totalLectures++;
                if (lec.isCompleted) completedLectures.push(lec.lectureId.toString());
            }

            percentage = totalLectures > 0 ? Math.round((completedLectures.length / totalLectures) * 100) : 0;
            progressSummary.push({
                completedLectures,
                totalLectures,
                percentage
            });
        }

        return progressSummary;

    } catch (error) {
        throw error
    }
}

export const getUserCourseOverallProgressSummary = async (courseId: string, userId: string): Promise<{ percentage: number }> => {
    try {
        const courseProgress = await UserCourseProgress.findOne({
            courseId,
            userId,
        });

        let progressSummary: IProgressSummary = {
            completedLectures: [],
            totalLectures: 0,
            percentage: 0
        };

        if (!courseProgress) {
            return progressSummary;
        }

        for (const mod of courseProgress.progress) {
            for (const lec of mod.lectures) {
                progressSummary.totalLectures++;
                if (lec.isCompleted) progressSummary.completedLectures.push(lec.lectureId.toString());
            }
        }

        progressSummary.percentage = progressSummary.totalLectures > 0 ? Math.round((progressSummary.completedLectures.length / progressSummary.totalLectures) * 100) : 0;

        return {
            percentage: progressSummary.percentage
        };

    } catch (error) {
        throw error
    }
}
import UserCourseProgress from '../models/userCourseProgress.model.js';

export const getUserCourseProgressSummary = async (courseId, userId) => {
    try {
        const courseProgress = await UserCourseProgress.findOne({
            courseId,
            userId,
        });

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

        console.log(progressSummary);

        return progressSummary;

    } catch (error) {
        throw error
    }
}

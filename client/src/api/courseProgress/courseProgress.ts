import { axiosInst } from "../../lib/axios";

export const updateCourseProgress = async (courseId: string, lectureId: string, isCompleted: boolean) => {
    const { data } = await axiosInst.patch(`/progress/${courseId}/lecture/${lectureId}`, { isCompleted });
    return data;
};

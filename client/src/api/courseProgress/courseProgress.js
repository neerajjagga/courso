import { axiosInst } from "../../lib/axios";

export const updateCourseProgress = async (courseId, lectureId, isCompleted) => {
    const { data } = await axiosInst.patch(`/progress/${courseId}/lecture/${lectureId}`, { isCompleted });
    return data;
};

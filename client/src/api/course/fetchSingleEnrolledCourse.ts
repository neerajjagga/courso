import { axiosInst } from "../../lib/axios";

export const fetchSingleEnrolledCourse = async (titleSlug: string) => {
    const res = await axiosInst.get(`/courses/me/enrolled/${titleSlug}`);
    return res.data;
}
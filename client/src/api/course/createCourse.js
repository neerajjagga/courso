import { axiosInst } from "../../lib/axios";

export const createCourse = async (data) => {
    const res = await axiosInst.post('/courses', { ...data });
    return res.data;
}
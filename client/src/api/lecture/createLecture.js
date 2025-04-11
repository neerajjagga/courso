import { axiosInst } from "../../lib/axios";

export const createLecture = async (data) => {
    const res = await axiosInst.post(`/lectures`, { ...data });
    return res.data.modules;
}
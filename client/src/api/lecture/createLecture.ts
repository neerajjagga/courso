import { axiosInst } from "../../lib/axios";

export const createLecture = async (data: { title: string, isFreePreview: boolean, moduleId: string }) => {
    const res = await axiosInst.post(`/lectures`, { ...data });
    return res.data.modules;
}
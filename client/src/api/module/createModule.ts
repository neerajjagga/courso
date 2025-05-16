import { axiosInst } from "../../lib/axios";

export const createModule = async (data: { title: string, courseId: string }) => {
    const res = await axiosInst.post(`/modules`, { ...data });
    return res.data;
}
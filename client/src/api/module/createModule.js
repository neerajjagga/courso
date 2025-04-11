import { axiosInst } from "../../lib/axios";

export const createModule = async (data) => {
    const res = await axiosInst.post(`/modules`, { ...data });
    return res.data;
}
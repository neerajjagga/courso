import { axiosInst } from "../../lib/axios";

export const deleteModule = async (moduleId) => {
    const res = await axiosInst.delete(`/modules/${moduleId}`);
    return res.data;
}
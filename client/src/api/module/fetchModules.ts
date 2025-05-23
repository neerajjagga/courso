import { axiosInst } from "../../lib/axios";

export const fetchModules = async (courseId: string) => {
    const res = await axiosInst.get(`/modules/${courseId}`);
    return res.data.modules;
}
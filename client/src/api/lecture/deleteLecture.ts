import { axiosInst } from "../../lib/axios";

export const deleteLecture = async (lectureId: string) => {
    const res = await axiosInst.delete(`/lectures/${lectureId}`);
    return res.data;
}
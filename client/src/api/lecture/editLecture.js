import { axiosInst } from "../../lib/axios";

export const editLecture = async (lectureId, data) => {
    const res = await axiosInst.patch(`/lectures/${lectureId}`, { ...data });
    return res.data.modules;
}
import { axiosInst } from "../../lib/axios";

export const editLecture = async (lectureId: string, data: { videoUrl?: string, description?: string }) => {
    const res = await axiosInst.patch(`/lectures/${lectureId}`, { ...data });
    return res.data.modules;
}
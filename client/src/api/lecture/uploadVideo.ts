import { axiosInst } from "../../lib/axios";

export const uploadVideo = async (lectureId: string, formData: FormData) => {
    const res = await axiosInst.post(`/lectures/${lectureId}/upload-video`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}
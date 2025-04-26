import { axiosInst } from "../../lib/axios";

export const createRazorpayOrder = async (courseId) => {
    const { data } = await axiosInst.post(`/payments/create-order`, { courseId });
    return data.order;
};
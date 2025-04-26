import { axiosInst } from "../../lib/axios";

export const verifyRazorpayPayment = async (paymentDetails) => {
    const { data } = await axiosInst.post(`/payments/verify`, paymentDetails);
    return data;
};

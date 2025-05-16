import { axiosInst } from "../../lib/axios";
import { PaymentDetailsSingleCourseCard } from 'types/payment';

export const verifyRazorpayPayment = async (paymentDetails: PaymentDetailsSingleCourseCard) => {
    const { data } = await axiosInst.post(`/payments/verify`, paymentDetails);
    return data;
};

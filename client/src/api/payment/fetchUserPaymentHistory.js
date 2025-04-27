import { axiosInst } from "../../lib/axios";

export const fetchUserPaymentHistory = async () => {
    const { data } = await axiosInst.get(`/payments/history`);
    return data.paymentHistory;
};

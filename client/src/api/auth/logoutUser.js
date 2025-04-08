import { axiosInst } from "../../lib/axios";

export const logoutUser = async () => {
    const res = await axiosInst.post('/auth/logout');
    return res.data;
}
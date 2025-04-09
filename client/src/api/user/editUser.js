import { axiosInst } from "../../lib/axios";

export const editUser = async (data) => {
    const res = await axiosInst.patch('/user/profile', { ...data });
    return res.data;
}
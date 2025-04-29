import { axiosInst } from "../../lib/axios";

export const fetchAuthUser = async () => {
    const res = await axiosInst.get('/user');
    return res.data.user;
}

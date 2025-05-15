import axios from 'axios';
import toast from 'react-hot-toast';
import { useUserStore } from '../store/useUserStore';

// const axiosInst = axios.create({
//     baseURL:
//         import.meta.env.MODE === "development"
//             ? "http://localhost:3000/api"
//             : import.meta.env.VITE_BACKEND_DEPLOYED_URL,
//     withCredentials: true,
// });

const axiosInst = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DEPLOYED_URL,
    withCredentials: true,
});

axiosInst.interceptors.response.use(
    (response) => response,
    (error) => {
        const { setUser } = useUserStore.getState();
        if (error.response) {
            if (error.response.status === 429) {
                toast.error("Too many requests, please try again later.");
                return Promise.resolve(error.response);
            } else if (error.response.status === 401) {
                setUser(null);
                return Promise.reject(error.response);
            } else if (error.response.status === 403) {
                toast.error(error.response.data.error || error.response.data.message || "Access Forbidden");
                return Promise.resolve(error.response);
            }
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export { axiosInst }
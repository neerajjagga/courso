import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInst = axios.create({
    baseURL:
        import.meta.env.MODE === "development"
            ? "http://localhost:3000/api"
            : import.meta.env.VITE_BACKEND_DEPLOYED_URL,
    withCredentials: true,
});

axiosInst.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 429) {
                toast.error("Too many requests, please try again later.");
            } else if (error.response.status === 401) {
                toast.error("Session expired, please log in again.");
            } else if (error.response.status === 403) {
                toast.error(error.response.data.error || error.response.data.message || "Access Forbidden");
            }
        }

        return Promise.resolve(error.response);
    }
)

export { axiosInst }
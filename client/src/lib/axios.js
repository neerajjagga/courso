import axios from 'axios';

export const axiosInst = axios.create({
    baseURL:
        import.meta.env.MODE === "development"
            ? "http://localhost:3000/api"
            : import.meta.env.VITE_BACKEND_DEPLOYED_URL,
    withCredentials: true,
});

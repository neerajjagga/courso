import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "http://localhost:3000/api",
    withCredentials : true,
})

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("API Error:", error.response?.data?.message || error.message);
        
        if(error.response?.status === 401) {
            try {
                await axiosInstance.post('/auth/refresh-token');
                return axiosInstance.request(error.config);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
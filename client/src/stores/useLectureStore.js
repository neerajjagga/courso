import toast from "react-hot-toast";
import { create } from "zustand";

const useLectureStore = create((set) => ({
    loading: false,
    lectures: [],
    setLectures: (lectures) => set({ lectures }),

    createLecture: async (data) => {
        set({ loading: true });
        try {
            const response = await axios.post('/api/lectures', data);
            set({ lectures: [...get().lectures, response.data.lecture], loading : false });
            toast.success("Lecture created successfully");
        } catch (error) {
            console.log(error);
            set({ loading: false });
            toast.error(error.response?.data?.message || "An error occurred while creating lecture");
        } 
    }
}));

export default useLectureStore;

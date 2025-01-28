import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useCourseStore = create((set, get) => ({
    courses: [],
    loading: false,
    success: false,

    setSuccess: (bool) => {
        set({ success: bool });
    },

    createCourse: async (formData) => {
        console.log(formData);
        set({ loading: true });

        try {
            const res = await axios.post('/courses', {
                data: { ...formData }
            });
            set((prev) => ({
                courses: [...prev.courses, res.data.course],
                loading: false,
                success: true,
            }))
            toast.success(res?.data?.message || "Course created successfully");
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while creating course")
        }
    },

    getCourses: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/courses/me');
            console.log(res);
            set({
                courses: res.data.courses,
                loading: false,
            });
            console.log(get().courses);
            console.log(res?.data?.message);
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while getting courses")
        }
    }
}));



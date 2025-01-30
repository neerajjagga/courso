import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useCourseStore = create((set, get) => ({
    allCourses : [],
    myCourses: [],
    selectedCourse : null,
    loading: false,
    success: false,

    setSuccess: (bool) => {
        set({ success: bool });
    },

    setSelectedCourse: (course) => {
        set({ selectedCourse: course });
        console.log(get().selectedCourse);
        console.log("Inside setselectedcourse");
    },

    createCourse: async (formData) => {
        console.log(formData);
        set({ loading: true });

        try {
            const res = await axios.post('/courses', {
                data: { ...formData }
            });
            set((prev) => ({
                myCourses: [res.data.course, ...prev.myCourses],
                loading: false,
                success: true,
            }))
            toast.success(res?.data?.message || "Course created successfully");
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while creating myCourses")
        }
    },

    getMyCourses: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/courses/me');
            console.log(res);
            set({
                myCourses: res.data.courses,
                loading: false,
            });
            console.log(get().myCourses);
            console.log(res?.data?.message);
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while getting myCourses");
        }
    },

    getAllCourses : async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/courses');
            console.log(res);
            set({
                allCourses : res.data.courses,
                loading : false,
            });
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while getting myCourses");
        }
    }, 

    getACourse : async (titleSlug) => {
        set({ loading : true });
        try {
            const res = await axios.get(`/courses/${titleSlug}`);
            console.log(res);
            set({ selectedCourse : res.data.course, loading : false});
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while getting a course");
        }
    }
}));



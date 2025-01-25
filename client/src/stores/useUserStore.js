
import { create } from 'zustand';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,
    checkingAuthLoader: false,

    signUp: async ({ fullname, email, password, confirmPassword }) => {
        console.log(fullname);

        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Password do not match");
        }

        if (fullname.length > 20) {
            set({ loading: false });
            return toast.error("Name should be maximum 20 characters");
        }

        try {
            const res = await axios.post('/auth/signup', {
                fullname,
                email,
                password,
            })
            console.log(res);
            set({ user: res.data.user, loading: false });
            toast.success(res.data?.message || "Account created successfully");
        } catch (error) {
            console.log(error);

            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while signup")
        }
    },

    login: async ({ email, password }) => {
        set({ loading: true });
        console.log(email, password);
        try {
            const res = await axios.post('/auth/login', {
                email,
                password,
            })
            console.log(res);
            set({ user: res.data.user, loading: false });
            toast.success(res.data?.message || "Login successfully");
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while login")
        }
    },

    checkAuth: async () => {
        set({ checkingAuthLoader: true })
        try {
            const res = await axios.get('/user/profile');
            set({ user: res.data.user, checkingAuthLoader: false });

        } catch (error) {
            console.log(error);
            set({ checkingAuthLoader: false })
            toast.error(error.response?.data?.message || "An error occurred while checking auth")
        }
    },

    logout: async () => {
        set({ loading: true })

        try {
            const res = await axios.post('/auth/logout');
            set({ user: null, loading: false });
            toast.success(res.data.message || "User loggedOut successfully");
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while logout")
        }
    },

    editProfile: async (updatedData) => {
        set({ loading: true });
       
        try {
            const res = await axios.patch('/user/profile', {
                updatedData
            })
            set({ user: res.data.user, loading: false });
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.error || "An error occurred while editing profile")
        }
    },

    editPhoto : async (updatedData) => {
        set({ loading : true });
        try {
            const res = await axios.patch("/user/profile", {
                updatedData
            })
            set({ user: res.data.user, loading: false });
            toast.success("Profile image updated successfully!");
        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.error || "An error occurred while updating profile image")
        }
    }
}))
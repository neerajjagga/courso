
import { create } from 'zustand';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

export const useUserStore = create((set, get) => ({
    user: null,
    loading: false,

    signUp: async ({ fullname, email, password, confirmPassword }) => {
        console.log(fullname);

        set({ loading: true });

        if (password !== confirmPassword) {
            set({ loading: false });
            return toast.error("Password do not match");
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
        set({ loading: true })
        try {
            const res = await axios.get('/auth/profile');
            set({ user: res.data.user, loading: false });

        } catch (error) {
            console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while checking auth")
        }
    },

    logout : async () => {
        set({ loading: true })

        try {
            const res = await axios.post('/auth/logout');
            set({ loading: false });
            toast.success(res.data.message || "User loggedOut successfully");
        } catch (error) {
              console.log(error);
            set({ loading: false })
            toast.error(error.response?.data?.message || "An error occurred while logout")
        }
    }
}))
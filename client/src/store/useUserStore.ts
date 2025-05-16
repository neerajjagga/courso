import { create } from 'zustand'
import { axiosInst } from '../lib/axios';
import toast from 'react-hot-toast'
import { User } from 'types/user';

interface UserStore {
    isLoading: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    user: User | null;

    setUser: (val: User | null) => void;
    signUp: (data: object) => Promise<void>;
    login: (data: object) => Promise<void>;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: object) => Promise<void | boolean>;
}

export const useUserStore = create<UserStore>((set, get) => ({
    isLoading: false,
    isUpdatingProfile: false,
    isCheckingAuth: false,
    user: null,

    setUser: (val) => set({ user: val }),

    signUp: async (data) => {
        set({ isLoading: true });
        try {
            const res = await axiosInst.post('/auth/signup', { ...data });
            set(() => ({
                user: res.data.user,
                isLoading: false
            }));
            toast.success(res.data?.message || "Account created successfully");
        } catch (error: any) {
            set({ isLoading: false });
            toast.error(error.response.data?.message || "Something went wrong!");
        }
    },

    login: async (data) => {
        set({ isLoading: true });
        try {
            const res = await axiosInst.post('/auth/login', { ...data });
            set(() => ({
                user: res.data.user,
                isLoading: false,
            }));
            toast.success("Logged in successfully");
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data?.message || "An error occurred while signin");
            set({ isLoading: false });
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInst.get('/user');
            set(() => ({
                user: res.data.user,
                isCheckingAuth: false
            }));
        } catch (error) {
            set({ isCheckingAuth: false });
        }
    },

    logout: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInst.post('/auth/logout');
            set({
                user: null,
                isLoading: false,
            });
            toast.success(res.data?.message || "Logout successfully");
        } catch (error: any) {
            set({ isLoading: false });
            toast.error(error.response?.data?.message || "An error occurred while logging out");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInst.patch('/user/profile', { ...data });
            useUserStore.getState().setUser(res.data.user);
            toast.success("Profile Updated Successfully!");
        } catch (error: any) {
            toast.error(error.response.data.message);
            return false;
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}));

import { create } from 'zustand';
import axios from './../lib/axios';
import toast from 'react-hot-toast';

export const usePaymentStore = create((set, get) => ({
    order: null,
    loading : false,

    createOrder : async (courseId) => {        
        set({ loading : true });
        try {
            const res = await axios.post('/payments/create-order', {
                courseId
            });
            set({ order: res.data.order, loading : false });
        } catch (error) {
            console.log(error);
            set({ loading: false });
            toast.error(error?.response?.data?.message || "Try again later");
        }
    }
}))
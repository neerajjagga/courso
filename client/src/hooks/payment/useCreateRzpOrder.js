import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createRazorpayOrder } from '../../api/payment/createRazorpayOrder';

export const useCreateRzpOrder = (courseId, setOrder) => {
    return useMutation({
        mutationFn: () => createRazorpayOrder(courseId),
        onSuccess: (order) => {
            setOrder(order);
        },
        onError: (err) => {
            const message = err.response?.data?.message || "Something went wrong!";
            toast.error(message);
        }
    });
}
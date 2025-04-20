import { useMutation } from '@tanstack/react-query';
import { createRazorpayOrder, verifyRazorpayPayment } from '../api/payments';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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

export const useVerifyPayment = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (paymentDetails) => verifyRazorpayPayment(paymentDetails),
        onSuccess: () => {
            setTimeout(() => navigate('/dashboard/enrollments'), 1500);
        },
    });
}
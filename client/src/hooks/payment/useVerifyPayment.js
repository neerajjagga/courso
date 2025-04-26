import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { verifyRazorpayPayment } from '../../api/payment/verifyRazorpayPayment';

export const useVerifyPayment = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (paymentDetails) => verifyRazorpayPayment(paymentDetails),
        onSuccess: () => {
            setTimeout(() => navigate('/dashboard/enrollments'), 1500);
        },
    });
}
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { verifyRazorpayPayment } from '../../api/payment/verifyRazorpayPayment';
import { PaymentDetailsSingleCourseCard } from 'types/payment';

export const useVerifyPayment = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (paymentDetails: PaymentDetailsSingleCourseCard) => verifyRazorpayPayment(paymentDetails),
        onSuccess: () => {
            setTimeout(() => navigate('/dashboard/enrollments'), 1500);
        },
    });
}
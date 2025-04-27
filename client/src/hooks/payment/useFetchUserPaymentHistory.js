import { useQuery } from '@tanstack/react-query';
import { fetchUserPaymentHistory } from '../../api/payment/fetchUserPaymentHistory';

export const useFetchUserPaymentHistory = () => {
    return useQuery({
        queryKey: ['payment-history'],
        queryFn: () => fetchUserPaymentHistory(),
    });
}
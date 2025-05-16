import { useMutation } from '@tanstack/react-query';
import { createRazorpayOrder } from '../../api/payment/createRazorpayOrder';
import React from 'react';
import { RazorpayCreatedOrder } from 'types/payment';
import { handleError } from '../../utils/handleError';

export const useCreateRzpOrder = (courseId: string, setOrder: React.Dispatch<React.SetStateAction<RazorpayCreatedOrder | null>>) => {
    return useMutation({
        mutationFn: () => createRazorpayOrder(courseId),
        onSuccess: (order: RazorpayCreatedOrder) => {
            setOrder(order);
        },
        onError: handleError
    });
}
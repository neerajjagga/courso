import { useQueryClient } from '@tanstack/react-query';

export const useAuthUser = () => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(['user']);
}
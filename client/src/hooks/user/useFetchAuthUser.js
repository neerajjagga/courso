import { useQuery } from '@tanstack/react-query';
import { fetchAuthUser } from '../../api/user/fetchAuthUser';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useFetchAuthUser = () => {
    const navigate = useNavigate();

    return useQuery({
        queryKey: ["user"],
        queryFn: fetchAuthUser,
        retry: false,
        onError: (error) => {
            if (error.response && error.response.status === 401) {
                toast.error("Your session has expired. Please log in again.");
                setTimeout(() => navigate('/login'), 500);
            } else {
                toast.error("Something went wrong");
            }
        }
    });
}

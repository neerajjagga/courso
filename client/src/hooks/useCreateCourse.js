import { useMutation } from '@tanstack/react-query';
import { createCourse } from '../api/course/createCourse';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useCreateCourse = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createCourse,
        onSuccess: () => {
            toast.success("Your course is now live");
            setTimeout(() => navigate('/dashboard/instructor/courses'), 2000);
        },
        onError: (err) => {
            const message = err.response?.data?.error || "Something went wrong!";
            toast.error(message);
        }
    });
}
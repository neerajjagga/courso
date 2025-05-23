import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../../api/course/createCourse';
import { handleError } from '../../utils/handleError';

export const useCreateCourse = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createCourse,
        onSuccess: () => {
            toast.success("Your course is now live");
            setTimeout(() => navigate('/dashboard/instructor/courses'), 2000);
        },
        onError: handleError
    });
}
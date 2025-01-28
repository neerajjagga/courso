import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCourseStore } from './../stores/useCourseStore';
import { motion } from 'motion/react';

const NewCoursePopUp = () => {
    const { setSuccess } = useCourseStore();

    const navigate = useNavigate();

    const handleCancel = () => {
        setSuccess(false);
        navigate('/dashboard/my-courses');
    }

    return (
        <motion.div
            initial={{ opacity: 0, opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 flex justify-center items-center min-h-screen bg-black bg-opacity-80 z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className=" relative min-w-[90%] md:min-w-[500px] min-h-[400px] flex flex-col items-center justify-center bg-[url('https://res.cloudinary.com/dabywmj68/image/upload/v1738053772/brcfgi0xfga9xo5jgdlf.png')] bg-cover border-b border-r shadow-white shadow-sm backdrop-blur-sm">

                <div className="flex flex-col gap-2 items-center">
                    <span className="text-4xl font-bold flex flex-col items-center">
                        Your course is now
                        <span className="bg-purple-600 font-extrabold py-1 px-4"> Live</span>
                    </span>
                    <span className="text-xl text-gray-200">Add content to your course</span>
                </div>
                <div className="transition-all ease-in duration-100 absolute top-1 right-2 bg-red-600 hover:rounded-md">
                    <button
                        onClick={handleCancel}
                        className="flex">
                        <X size={30} />
                    </button>
                </div>
                <Link to={'/'}>
                    <button className="bg-purple-600 py-2 px-6 rounded-sm mt-3 font-semibold text-xl shadow-xl">Add Content</button>
                </Link>
            </motion.div>

        </motion.div>
    )
}

export default NewCoursePopUp
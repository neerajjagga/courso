import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom'
import { convertImageToBase64 } from '../../../../utils/imageToBase64';
import { NewCourseStepsOutletContextType } from '../../../../types/course';

const StepFour = () => {
    const { courseFormData, setCourseFormData, setIsNextBtnEnabled } = useOutletContext<NewCourseStepsOutletContextType>();

    useEffect(() => {
        setIsNextBtnEnabled(true);
    }, []);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const base64: string = await convertImageToBase64(e);
            setCourseFormData((prev) => ({ ...prev, courseImageUrl: base64 }));
        } catch (error) {
            console.log("Image upload error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full gap-10 md:gap-10 md:pt-6">
            <div className='space-y-4 text-center md:space-y-8'>
                <h1 className="text-2xl font-bold text-gray-200 sm:text-3xl md:text-4xl">Add a course image (optional)</h1>
                <p className="text-gray-400">A great course image can attract more learners. You can skip this for now and add it later.</p>
            </div>

            <div className='flex flex-col items-start gap-4'>
                <div className="flex items-center flex-shrink-0 md:justify-center">
                    <img
                        className="border-2 border-gray-600 md:h-[360px] md:w-[640px] object-contain sm:h-[270px] sm:w-[480px] h-[180px] min-w-[310px] pointer-events-none"
                        src={`${courseFormData.courseImageUrl ? courseFormData.courseImageUrl : 'https://res.cloudinary.com/dabywmj68/image/upload/t_placeholder/v1738051049/placeholder_pg74id.webp'}`}
                        alt="Placeholder" />
                </div>
                <div className="flex flex-col gap-5 pl-6">
                    <label className="flex items-center justify-center w-10 h-10 bg-black rounded-full cursor-pointer">
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <span className={`btn-primary`}>Upload</span>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default StepFour
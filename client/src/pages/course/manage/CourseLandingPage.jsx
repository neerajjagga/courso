import React, { useEffect, useState } from 'react'
import DescriptionTextEditor from '../../../components/DescriptionTextEditor';
import { categories } from '../../../constants/categories';
import { languages } from '../../../constants/languages';
import { convertImageToBase64 } from '../../../utils/imageToBase64';
import { useLocation, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';
import CustomLoader from '../../../components/common/CustomLoader';
import { useFetchSingleCourse } from '../../../hooks/course/useFetchSingleCourse';
import { useEditCourse } from '../../../hooks/course/useEditCourse';

const CourseLandingPage = () => {
    const { courseId, titleSlug } = useOutletContext();
    const location = useLocation();
    const { data: course, isPending } = useFetchSingleCourse(titleSlug);

    const [courseFormData, setCourseFormData] = useState(null);
    const [isSaveBtnEnabled, setIsSaveBtnEnabled] = useState(false);

    const { mutate: editCourse, isPending: isEditingCourse } = useEditCourse(courseId);

    useEffect(() => {
        if (course) {
            setCourseFormData({
                title: course.title,
                description: course.description,
                language: course.language,
                level: course.level,
                courseImageUrl: course.courseImageUrl,
                price: course.price,
                category: course.category
            });
        }
    }, [course]);

    useEffect(() => {
        if (!course || !courseFormData) return;

        const hasChanges =
            courseFormData.title.trim() !== course.title.trim() ||
            courseFormData.description.trim() !== course.description.trim() ||
            courseFormData.language !== course.language ||
            courseFormData.level !== course.level ||
            courseFormData.category !== course.category ||
            courseFormData.price !== course.price ||
            courseFormData.courseImageUrl !== course.courseImageUrl;

        setIsSaveBtnEnabled(hasChanges);
    }, [courseFormData, course]);

    const handleImageChange = async (e) => {
        try {
            const base64 = await convertImageToBase64(e);
            console.log(base64);
            setCourseFormData((prev) => ({ ...prev, courseImageUrl: base64 }));
        } catch (error) {
            console.log("Image upload error:", error);
        }
    };

    const handleSave = () => {
        if (courseFormData) {
            if (!courseFormData.title) return toast.error("Title is required");
            if (!courseFormData.language || courseFormData.language === "Choose a language") return toast.error("Language is required");
            if (!courseFormData.level) return toast.error("Please select appropriate level");
            if (!courseFormData.category) return toast.error("Category is required");
            if (!courseFormData.price) return toast.error("Price is required");

            const updatedData = {};
            Object.entries(courseFormData).forEach(([key, value]) => {
                if (value !== course[key]) {
                    updatedData[key] = value;
                }
            });

            if (Object.keys(updatedData).length === 0) {
                toast("No changes to save");
                return;
            }
            editCourse(updatedData);
        }
    }

    if (isPending || !courseFormData) return <CustomLoader />

    return (
        <div className='flex flex-col h-full gap-5 border border-gray-400 rounded-lg shadow-2xl md:gap-10 border-opacity-20 shadow-gray-800'>
            <div className='flex flex-col justify-between gap-2 px-4 py-3 text-center border-b border-gray-400 md:py-5 xs:flex-row sm:px-6 border-opacity-20 sm:gap-0'>
                <h2 className='text-2xl sm:text-3xl'>Course landing page</h2>
                <div className='flex flex-col items-center gap-3 sm:flex-row sm:gap-2'>
                    {/* {location.pathname.split('/')[5] === "basics" && (
                        <button disabled={isPending} className='px-5 py-[0.25rem] lg:py-[0.40rem] rounded-md transition-all ease-in duration-100 hover:bg-[#1949b8] border border-[#2a5acb] hover:border-[#8cafff] flex justify-center items-center gap-2 md:text-lg text-base'>
                            <span className='hidden sm:block'>Preview</span>
                        </button>
                    )} */}
                    <button disabled={!isSaveBtnEnabled || isEditingCourse} onClick={handleSave} className={`${(isSaveBtnEnabled && !isEditingCourse) ? "btn-safe" : "btn-safe-disabled"}`}>
                        Save
                        {isEditingCourse && <span><Loader size={20} className='animate-spin' /></span>}
                    </button>
                </div>
            </div>

            <div className='flex flex-col flex-wrap gap-6 px-4 pb-6 md:gap-10 sm:px-6 sm:pb-10'>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="title" className='text-lg text-gray-300 sm:text-xl'>Course title</label>
                    <div className='relative'>
                        <input
                            type="text"
                            id='title'
                            name='title'
                            className='w-full py-2 pr-16 text-lg sm:text-xl input-primary'
                            value={courseFormData.title}
                            onChange={(e) => setCourseFormData((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder='e.g. Learn Photoshop CS6 from Scratch'
                            maxLength={60}
                        />
                        <span className='absolute text-sm text-gray-300 -translate-y-1/2 sm:text-xl top-1/2 right-4'>{courseFormData?.title?.length}</span>
                    </div>
                </div>

                <div className='w-full'>
                    <label htmlFor="description" className='block mb-2 text-lg text-gray-300 sm:text-xl'>Description</label>
                    <DescriptionTextEditor
                        setCourseFormData={setCourseFormData}
                        initialDescription={courseFormData.description}
                    />
                </div>

                <div className='grid grid-cols-1 gap-6 pt-4 md:pt-10 md:grid-cols-3'>
                    <div className="flex flex-col gap-2">
                        <label className="text-base text-gray-300 xs:text-lg md:text-xl">Select Category:</label>
                        <select
                            value={courseFormData.category}
                            onChange={(e) => setCourseFormData({ ...courseFormData, category: e.target.value })}
                            className="py-2 input-primary"
                            required
                        >
                            {categories.map((category, index) => (
                                <option className='bg-bg-primary' key={index} value={category.for}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-base text-gray-300 xs:text-lg md:text-xl">Select Level:</label>
                        <select
                            value={courseFormData.level}
                            onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value })}
                            className="py-2 input-primary"
                            required
                        >
                            <option className='bg-bg-primary' value="">Choose a level</option>
                            <option className='bg-bg-primary' value="beginner">Beginner Level</option>
                            <option className='bg-bg-primary' value="intermediate">Intermediate Level</option>
                            <option className='bg-bg-primary' value="expert">Expert Level</option>
                            <option className='bg-bg-primary' value="all">All Levels</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-base text-gray-300 xs:text-lg md:text-xl">Select Language:</label>
                        <select
                            value={courseFormData.language}
                            onChange={(e) => setCourseFormData({ ...courseFormData, language: e.target.value })}
                            className="py-2 input-primary"
                            required
                        >
                            {languages.map((language, index) => (
                                <option className='bg-bg-primary' key={index} value={language.name}>
                                    {language.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col w-full gap-2 md:w-1/2">
                    <label className="text-base text-gray-300 xs:text-lg md:text-xl">
                        Price: <span className="text-md">(in ₹)</span>
                    </label>
                    <input
                        value={courseFormData.price}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            if (/^\d{0,8}$/.test(newValue)) {
                                setCourseFormData({
                                    ...courseFormData,
                                    price: newValue
                                });
                            }
                        }}
                        type="number"
                        className="w-full input-primary"
                        placeholder={`in ₹`}
                        required
                    />
                </div>

                <div className='flex flex-col items-center gap-4 md:items-start'>
                    <img
                        className="border-2 border-gray-600 object-contain w-[320px] sm:w-[480px] md:w-[640px] h-[180px] sm:h-[270px] md:h-[360px]"
                        src={
                            courseFormData.courseImageUrl
                                ? courseFormData.courseImageUrl
                                : 'https://res.cloudinary.com/dabywmj68/image/upload/t_placeholder/v1738051049/placeholder_pg74id.webp'
                        }
                        alt="Course"
                    />
                    <div className='flex flex-col items-center gap-4 sm:flex-row'>
                        <label className="flex items-center justify-center h-10 bg-black rounded-full cursor-pointer w-28">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <span className={`btn-primary`}>Upload</span>
                        </label>
                        {courseFormData.courseImageUrl && (
                            <button disabled={isEditingCourse} onClick={() => setCourseFormData((prev) => ({ ...prev, courseImageUrl: null }))} className='btn-danger'>Remove</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseLandingPage;

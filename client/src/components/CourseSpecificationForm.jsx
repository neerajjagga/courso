import { handleFileChange } from './../utils/handleFileChange';
import { categoryItems } from '../data/categoryItems';
import { useState } from "react";
import { languageItems } from '../data/languageItems';
import { useCourseStore } from '../stores/useCourseStore';

const CourseSpecificationForm = ({ formData, setFormData, courseImage, setCourseImage }) => {

    const [isSelectedImage, setIsSelectedImage] = useState(false);
    const [isCompressingImage, setIsCompressingImage] = useState(false);
    const { loading } = useCourseStore();

    return (
        <form className="flex flex-col gap-10">

            <div className="flex flex-col gap-2">
                <label className="text-xl text-gray-300">Select Image:</label>
                <div className="flex flex-col justify-between lg:flex-row gap-3 md:gap-10">
                    <div className="flex-shrink-0 flex md:justify-center items-center">
                        <img
                            className="h-[270px] w-[480px] object-contain border-2 border-gray-600"
                            src={`${courseImage ? courseImage : 'https://res.cloudinary.com/dabywmj68/image/upload/t_placeholder/v1738051049/placeholder_pg74id.webp'}`}
                            alt="Placeholder" />
                    </div>
                    <div className="flex flex-col gap-5">
                        <span className="text-lg">Upload your course image here. It must meet our <span className="text-blue-500 underline">course image quality standards</span> to be accepted. Important guidelines: 1920x1080 pixels; .jpg, .jpeg,. gif, or .png.</span>
                        <div className="flex flex-col gap-2">
                            {isSelectedImage ? (
                                <p className="text-green-500">Image selected successfully</p>
                            ) : (
                                <p className="text-red-500">Please select an image to update</p>
                            )}
                            {isCompressingImage && (
                                <p className="text-gray-500">Compressing image....</p>
                            )}
                        </div>
                        <label className="mb-2 mr-2 cursor-pointer h-10 w-10 bg-black flex justify-center items-center rounded-full">
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                disabled={loading}
                                onChange={(e) => {
                                    handleFileChange(e, setIsSelectedImage, setIsCompressingImage, setCourseImage, courseImage);
                                }}
                            />
                            <span className={`text-white py-2 px-6 rounded-sm ml-14 ${loading ? "bg-gray-500" : "btn-primary"}`}>Upload</span>
                        </label>

                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

                <div className="flex flex-col gap-2">
                    <label className="text-xl text-gray-300">
                        Select Category:
                    </label>
                    <select
                        disabled={loading}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full input-primary px-4 py-2 pr-11"
                        required
                    >
                        {categoryItems.map((category, index) => {
                            return <option key={index} value={category.for}>{category.name}</option>
                        })}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xl text-gray-300">
                        Select Level:
                    </label>
                    <select
                        disabled={loading}
                        value={formData.level}
                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                        className="w-full input-primary px-4 py-2 pr-11"
                        required
                    >
                        <option value="">Choose a level</option>
                        <option value="beginnerLevel">Beginner Level</option>
                        <option value="intermediateLevel">Intermediate Level</option>
                        <option value="expertLevel">Expert Level</option>
                        <option value="allLevels">All Levels</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xl text-gray-300">
                        Select Language:
                    </label>
                    <select
                        disabled={loading}
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full input-primary px-4 py-2 pr-11"
                        required
                    >
                        {languageItems.map((category, index) => {
                            return <option key={index} value={category.for}>{category.name}</option>
                        })}
                    </select>
                </div>

            </div>

            <div className="relative flex flex-col gap-2">
                <label className="text-xl text-gray-300">
                    Price: <span className="text-md">(in ₹)</span>
                </label>
                <div>
                    <input
                        disabled={loading}
                        value={formData.price.amount}
                        onChange={(e) => {
                            const newValue = e.target.value;
                            if (/^\d{0,8}$/.test(newValue)) {
                                setFormData({
                                    ...formData,
                                    price: { ...formData.price, amount: newValue }
                                });
                            }
                        }}
                        type="number"
                        className="w-full sm:w-[50%] input-instructor-primary px-4 py-2" placeholder={`in ₹`}
                        required
                    />
                </div>
            </div>

        </form>
    )
}

export default CourseSpecificationForm
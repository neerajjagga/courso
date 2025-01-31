import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourseStore } from "../../stores/useCourseStore";
import CourseSpecificationForm from "../../components/CourseSpecificationForm";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { motion } from 'motion/react';

const EditCourse = () => {
    const [course, setCourse] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        description: "",
        category: "",
        level: "",
        language: "",
        price: {
            amount: "",
        },
    });
    const [courseImage, setCourseImage] = useState('');
    const [isFetchingCourse, setIsFetchingCourse] = useState(true);
    const [error, setError] = useState('');

    const { titleSlug } = useParams();
    const { myCourses, updateCourse, loading } = useCourseStore();
    const navigate = useNavigate();

    useEffect(() => {
        const course = myCourses.find(course => course.titleSlug === titleSlug);
        if (course) {
            setCourse(course);
            setFormData({
                title: course?.title,
                subtitle: course?.subtitle,
                description: course?.description,
                category: course?.category,
                level: course?.level,
                language: course?.language,
                price: {
                    amount: course?.price?.amount,
                },
            })
            setCourseImage(course?.courseImageUrl);
            setIsFetchingCourse(false);
        }
    }, [myCourses]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title) {
            setError("Title is required 🦜");
            toast.error("Title is required");
            return;
        }
        if (!formData.language || formData.language === "Choose a language") {
            setError("Please select language 🦜");
            toast.error("Language is required");
            return;
        }
        if (!formData.level) {
            setError("Please select appropriate level");
            toast.error("Please select appropriate level");
            return;
        }
        if (!formData.category) {
            setError("Please select category, to react your target audience");
            toast.error("Category is required");
            return;
        }
        if (!formData.price.amount) {
            setError("Price is required 💰");
            toast.error("Price is required");
            return;
        }
        if (courseImage !== course.courseImageUrl) {
            formData["courseImageUrl"] = courseImage;
        }
        console.log(formData);
        await updateCourse(course.id, formData);
        if (!loading) {
            navigate('/dashboard/my-courses');
        }
    }

    return (
        <div className="min-h-screen w-full py-3 px-4 lg:px-10 mt-16 flex flex-col gap-8">
            {isFetchingCourse ? (
                <div>
                    Loading.....
                </div>
            ) : (
                course ? (
                    <div className="flex flex-col gap-8 items-center">
                        <div>
                            <span className="text-4xl font-bold pl-20 flex w-full justify-start">
                                Edit <span className="text-blue-500">Course </span>
                                <span className="">{course.title.slice(0, 20)}</span>
                            </span>
                        </div>

                        {error && (
                            <motion.span
                                className="text-red-500 text-md font-semibold -mb-7 ml-1 mt-2"
                                initial={{ opacity: 0, }}
                                animate={{ opacity: 1, }}
                                transition={{ duration: 0.4 }}
                            >
                                {error}
                            </motion.span>
                        )}

                        <div className="flex flex-col gap-5">
                            <form className="flex flex-col gap-5">
                                <div className="relative flex flex-col gap-2">
                                    <label className="text-xl text-gray-300">
                                        Title:
                                    </label>
                                    <input
                                        value={formData.title}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 80) {
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                        }}
                                        type="text"
                                        className="w-full input-instructor-primary px-4 py-2 pr-10" placeholder="eg. Cohort 3.0 - Web Development Program"
                                        required
                                    />
                                    <span className="absolute right-3 top-10 text-lg">
                                        {80 - formData.title.length}
                                    </span>
                                </div>

                                <div className="relative flex flex-col gap-2">
                                    <label className="text-xl text-gray-300">
                                        Subtitle:
                                    </label>
                                    <input
                                        value={formData.subtitle}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 200) {
                                                setFormData({ ...formData, subtitle: e.target.value })
                                            }
                                        }}
                                        type="text"
                                        className="w-full input-instructor-primary px-4 py-2 pr-10" placeholder="eg. Cohort 3.0 - Web Development Program"
                                    />
                                    <span className="absolute right-3 top-10 text-lg">
                                        {200 - formData.subtitle.length}
                                    </span>
                                </div>

                                <div className="relative flex flex-col gap-2">
                                    <label className="text-xl text-gray-300">
                                        Description:
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 3000) {
                                                setFormData({ ...formData, description: e.target.value })
                                            }
                                        }}
                                        className="w-full input-instructor-primary px-4 py-2 pr-16" placeholder="eg. Cohort 3.0 - Web Development Program"
                                        rows={15}
                                    />
                                    <span className="absolute right-6 top-10 text-lg">
                                        {3000 - formData.description.length}
                                    </span>
                                </div>
                            </form>
                            <CourseSpecificationForm formData={formData} setFormData={setFormData} courseImage={courseImage} setCourseImage={setCourseImage} />
                        </div>

                        <div>
                            <button
                                disabled={loading}
                                onClick={handleSubmit}
                                className={`${loading ? "bg-green-500" : "bg-green-600"} py-2 px-8 rounded-md mt-2 font-semibold flex items-center justify-center gap-2`}>
                                {loading && (
                                    <Loader className="animate-spin" />
                                )}
                                Update Course
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>Course not found. Try again later</div>
                )
            )}
        </div>
    )
}

export default EditCourse
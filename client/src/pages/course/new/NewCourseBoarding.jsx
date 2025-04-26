import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import { Loader } from 'lucide-react'
import { useCreateCourse } from '../../../hooks/course/useCreateCourse';

const NewCourseBoarding = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { mutate: createCourse, isPending } = useCreateCourse();

    const [currentStep, setCurrentStep] = useState(null);
    const [isNextBtnEnabled, setIsNextBtnEnabled] = useState(false);
    const [isBackBtnEnabled, setIsBackBtnEnabled] = useState(false);
    const [isLiveCourseBtnEnabled, setIsLiveCourseBtnEnabled] = useState(false);

    const [courseFormData, setCourseFormData] = useState({
        title: "",
        description: "",
        language: "",
        level: "",
        courseImageUrl: "",
        price: "",
        category: ""
    });

    useEffect(() => {
        const step = parseInt(location.pathname.split('/')[4]);
        setCurrentStep(step);
        if (step === 1) {
            setIsBackBtnEnabled(false);
        } else {
            setIsBackBtnEnabled(true);
        }
    }, [location.pathname]);

    useEffect(() => {
        const hasAbleToLiveCourse = courseFormData.title && (courseFormData.language && courseFormData.language !== "Choose a language") && courseFormData.level && courseFormData.category && courseFormData.price;

        if (hasAbleToLiveCourse) {
            setIsLiveCourseBtnEnabled(true);
        }
    }, [courseFormData, setIsLiveCourseBtnEnabled]);

    const handleCourseLive = () => {
        if (!courseFormData.title) {
            toast.error("Title is required");
            return;
        }
        if (!courseFormData.language || courseFormData.language === "Choose a language") {
            toast.error("Language is required");
            return;
        }
        if (!courseFormData.level) {
            toast.error("Please select appropriate level");
            return;
        }
        if (!courseFormData.category) {
            toast.error("Category is required");
            return;
        }
        if (!courseFormData.price) {
            toast.error("Price is required");
            return;
        }
        console.log(courseFormData);
        createCourse(courseFormData);
    }

    return (
        <div className="relative min-h-screen">
            <div>
                {/* navbar */}
                <div className="z-50 py-1 border-b border-gray-400 border-opacity-50 md:py-2 bg-bg-primary">
                    <div className="container flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-6">
                            <Link to='/' className="cursor-pointer">
                                <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold bg-[linear-gradient(180deg,_#3e75f3_50%,_#0b3db2_120%)] bg-clip-text text-transparent">Courso</h1>
                            </Link>

                            <span className="text-4xl text-gray-800 md:text-5xl">|</span>

                            <div className="text-xl md:text-2xl">
                                Step {location.pathname.split('/')[4]}
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={isPending}
                                onClick={() => navigate('/dashboard/instructor/courses')}
                                className={`${isPending ? "btn-primary-disabled" : "btn-primary"}`}>
                                Exit
                            </button>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <div className="fixed bottom-0 z-50 w-full py-2 pb-4 border-t border-gray-400 border-opacity-50 bg-bg-primary">
                    <div className="container flex items-center justify-between">
                        {currentStep !== 5 ? (
                            <button
                                onClick={() => navigate(`/instructor/course/create/${currentStep + 1}`)}
                                disabled={!isNextBtnEnabled}
                                className={` ${isNextBtnEnabled ? "btn-secondary" : "btn-secondary-disabled"} z-40`}>
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate(`/instructor/course/create/${currentStep - 1}`)}
                                disabled={!isBackBtnEnabled || isPending}
                                className={` ${(isBackBtnEnabled && !isPending) ? "btn-primary" : "btn-primary-disabled"} z-40`}>
                                Back
                            </button>
                        )}

                        {currentStep !== 5 ? (
                            <button
                                onClick={() => navigate(`/instructor/course/create/${currentStep - 1}`)}
                                disabled={!isBackBtnEnabled}
                                className={` ${isBackBtnEnabled ? "btn-primary" : "btn-primary-disabled"} z-40`}>
                                Back
                            </button>
                        ) : (
                            <button
                                onClick={handleCourseLive}
                                disabled={!isLiveCourseBtnEnabled || isPending}
                                className={` ${isLiveCourseBtnEnabled ? "btn-secondary" : "btn-secondary-disabled"} z-40 flex justify-center items-center gap-2`}>
                                Live Your Course
                                {isPending && <span><Loader className="animate-spin" size={22} /></span>}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* main content */}
            <main className="container pt-12">
                <Outlet
                    context={{ courseFormData, setCourseFormData, isNextBtnEnabled, setIsNextBtnEnabled, setIsBackBtnEnabled }}
                />
            </main>
        </div>
    )
}

export default NewCourseBoarding
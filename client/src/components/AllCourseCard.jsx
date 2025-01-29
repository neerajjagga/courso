import { Youtube, Users, Star, Rocket, BookOpenText } from "lucide-react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCourseStore } from "../stores/useCourseStore";

const AllCourseCard = ({ course }) => {

    const navigate = useNavigate();
    const { setSelectedCourse } = useCourseStore();

    const handleViewDetails = (course) => {
        console.log(course);
        setSelectedCourse(course);
        navigate(`/courses/${course.titleSlug}`);
    }

    return (
        <div className="flex flex-col gap-2 h-full bg-gray-900 shadow-lg rounded-2xl overflow-hidden">
            <div className="relative flex justify-center">
                <img className="" src={course.courseImageUrl || "https://res.cloudinary.com/dabywmj68/image/upload/v1738051049/placeholder_pg74id.webp"} alt={course.title} />
                <span className="absolute top-2 left-2 text-sm font-bold  bg-gradient-to-b text-black from-amber-200 to-yellow-400 py-1 px-3 rounded-2xl shadow-md">
                    {course.category.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())}
                </span>
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>

            <div className="flex flex-col gap-0 px-4">
                <div className="flex flex-col gap-1 border-b-2 border-gray-800 pb-2">
                    <span className="md:text-2xl text-lg font-bold bg-gradient-to-bl from-white to-gray-300 bg-clip-text text-transparent truncate">
                        {course.title}
                        {/* {course.title.length > 50 ? `${course.title.slice(0, 50)}...` : course.title} */}
                    </span>
                    {course.subtitle && (
                        <span className="truncate text-sm text-gray-400">{course.subtitle}</span>
                    )}
                </div>

                <div className="flex gap-3 items-center mt-1">
                    <img className="h-10 w-10 rounded-full border-2 border-gray-700" src={course.instructor.profileImageUrl} alt={course.instructor.fullname} />
                    <span className="text-lg text-gray-300 font-medium">{course.instructor.fullname}</span>
                </div>
            </div>

            <div className="px-4 flex flex-wrap gap-2 text-gray-300 text-sm">
                <span className="bg-gray-800 px-3 py-1 rounded-full">📚 {course.level.charAt(0).toUpperCase()}{course.level.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">🌎 {course.language}</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                    <Users size={16} /> {course.students.length || "0"} Students
                </span>
                <span className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={16} className="text-yellow-400" /> {course.reviews.length || "0"} Reviews
                </span>
            </div>

            <div className="px-4 flex justify-between items-center">
                <span className="text-2xl font-semibold text-blue-500">{course.price.currencySymbol}{course.price.amount}</span>
                <span className="text-gray-300 text-xs flex gap-1 md:text-base items-center">
                    <span className="invisible sm:visible">Launched on -</span>
                    <span className="sm:hidden"><Rocket size={19} /></span>
                    <span className="font-semibold">
                        {new Date(course.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </span>
            </div>

            <div className="px-4 h-full flex items-end">
                <button onClick={() => handleViewDetails(course)} className="w-full flex justify-center items-center gap-2 rounded-lg py-[0.4rem] bg-blue-600 hover:bg-blue-500 transition-all">
                    <BookOpenText size={24} />
                    <span className="sm:text-xl font-semibold">View Details</span>
                </button>
            </div>
        </div>
    );
};

export default AllCourseCard;

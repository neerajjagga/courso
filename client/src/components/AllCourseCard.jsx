import { Youtube, Users, Star } from "lucide-react";

const AllCourseCard = ({ course }) => {
    return (
        <div className="flex flex-col gap-4 h-full bg-gray-900 shadow-lg rounded-2xl overflow-hidden">
            <div className="relative w-full">
                <img className="w-full h-56 object-cover" src={course.courseImageUrl} alt={course.title} />
                <span className="absolute top-2 left-2 text-sm font-bold bg-gradient-to-b from-amber-200 to-yellow-400 py-1 px-3 rounded-2xl shadow-md">
                    {course.category.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())}
                </span>
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>

            <div className="flex flex-col gap-2 px-4">
                <span className="text-2xl font-bold bg-gradient-to-bl from-white to-gray-300 bg-clip-text text-transparent">
                    {course.title.length > 50 ? `${course.title.slice(0, 50)}...` : course.title}
                </span>
                {course.subtitle && (
                    <span className="truncate text-lg text-gray-400 border-b border-gray-700 pb-3">{course.subtitle}</span>
                )}

                <div className="flex gap-3 items-center">
                    <img className="h-10 w-10 rounded-full border-2 border-gray-700" src={course.instructor.profileImageUrl} alt={course.instructor.fullname} />
                    <span className="text-lg text-gray-300 font-medium">{course.instructor.fullname}</span>
                </div>
            </div>

            <div className="px-4 flex flex-wrap gap-3 text-gray-300 text-sm">
                <span className="bg-gray-800 px-3 py-1 rounded-full">📚 {course.level.replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
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
                <span className="text-gray-300 text-sm">
                    Launched on - <span className="font-semibold">
                        {new Date(course.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </span>
            </div>

            <div className="px-4 pb-4">
                <button className="w-full flex justify-center items-center gap-2 rounded-lg py-3 bg-blue-600 hover:bg-blue-500 transition-all">
                    <Youtube size={24} />
                    <span className="text-xl font-semibold">Enroll Now</span>
                </button>
            </div>
        </div>
    );
};

export default AllCourseCard;

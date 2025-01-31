import { Youtube, Users, Star, Rocket, Trash2, Edit, Eye, Gauge, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCourseStore } from "../stores/useCourseStore";
import { useState } from "react";

const AdminCourseCard = ({ course }) => {
    const navigate = useNavigate();
    const { setSelectedCourse, deleteACourse } = useCourseStore();
    const [isDeletePopUpActive, setIsDeletePopUpActive] = useState(false);
    const [deleteInput, setDeleteInput] = useState("");

    const handleViewDetails = () => {
        setSelectedCourse(course);
        navigate(`/dashboard/courses/${course.titleSlug}`);
    };

    const handleEditCourse = () => {
        navigate(`/dashboard/courses/edit/${course.titleSlug}`);
    };

    const handleDeleteConfirmation = () => {
        if (deleteInput === "DELETE") {
            deleteACourse(course.id);
            setIsDeletePopUpActive(false);
        }
    };

    return (
        <div className="flex flex-col gap-3 h-full bg-gray-800 shadow-xl rounded-lg overflow-hidden p-4 border border-gray-700">
            <div className="relative flex justify-center rounded-lg overflow-hidden">
                <img className="" src={course.courseImageUrl || "https://res.cloudinary.com/dabywmj68/image/upload/v1738051049/placeholder_pg74id.webp"} alt={course.title} />
                <span className="absolute top-2 left-2 text-xs font-bold bg-yellow-400 text-black py-1 px-3 rounded-lg">
                    {course.category.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())}
                </span>
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            </div>

            <div className="flex flex-col gap-1 border-b pb-2 border-gray-700">
                <span className="text-lg font-bold text-white truncate">{course.title}</span>
                {course.subtitle && <span className="text-sm text-gray-400 truncate">{course.subtitle}</span>}
            </div>

            <div className="flex flex-wrap gap-2 text-gray-300 text-sm mt-2">
                <span className="bg-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
                    <Gauge size={16} className='text-red-500' /> {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </span>
                <span className="bg-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
                    <Globe size={16} className="text-blue-500" /> {course.language}
                </span>
                <span className="bg-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
                    <Users size={16} /> {course.students.length || "0"} Students
                </span>
                <span className="bg-gray-700 px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={16} className="text-yellow-400" /> {course.reviews.length || "0"} Reviews
                </span>
            </div>

            <div className="flex justify-between items-center mt-2">
                <span className="text-xl font-semibold text-green-400">{course.price.currencySymbol}{course.price.amount}</span>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Rocket size={16} /> {new Date(course.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
            </div>

            <div className="flex gap-2 mt-3">
                <button onClick={handleViewDetails} className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
                    <Eye size={18} /> View
                </button>
                <button onClick={handleEditCourse} className="flex items-center gap-2 px-3 py-2 bg-yellow-500 hover:bg-yellow-400 text-black rounded-lg">
                    <Edit size={18} /> Edit
                </button>
                <button onClick={() => setIsDeletePopUpActive(true)} className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg">
                    <Trash2 size={18} /> Delete
                </button>
            </div>

            {isDeletePopUpActive && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-96">
                        <h2 className="text-lg font-bold">Are you sure?</h2>
                        <p className="text-sm text-gray-400 mt-2">Deleting this course will affect your students. Type <span className="font-bold text-red-600">"DELETE"</span> to confirm.</p>
                        <input
                            type="text"
                            value={deleteInput}
                            onChange={(e) => setDeleteInput(e.target.value)}
                            className="mt-3 w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                            placeholder="Type DELETE to confirm"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={() => setIsDeletePopUpActive(false)} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">Cancel</button>
                            <button onClick={handleDeleteConfirmation} disabled={deleteInput !== "DELETE"} className={`px-3 py-2 ${deleteInput === "DELETE" ? "bg-red-600 hover:bg-red-500" : "bg-gray-700"} text-white rounded-lg`}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCourseCard;

import { useEffect } from "react";
import { useCourseStore } from "../stores/useCourseStore";
import MyCoursesShimmer from "../components/Shimmers/MyCoursesShimmer";
import AllCourseCard from "../components/AllCourseCard";

const CoursesPage = () => {

  const { allCourses, getAllCourses, loading } = useCourseStore();

  useEffect(() => {
    getAllCourses();
  }, [getAllCourses])

  return (
    <div className="mt-28 min-h-screen px-8">
      <div className="text-3xl font-bold text-center">
        <span>What would you like to <span className="text-blue-500">learn?</span></span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-3 px-5">
          {Array(6).fill(0).map((_, index) => (
            <MyCoursesShimmer key={index} />
          ))}
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10`}>
          {allCourses.map((course) => (
            <div key={course.id} className="rounded-2xl shadow-md bg-gradient-to-t from-slate-900 to-slate-700 pb-4 overflow-hidden">
              <AllCourseCard course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CoursesPage
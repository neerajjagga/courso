import { useEffect } from "react";
import { useCourseStore } from "../../stores/useCourseStore";
import AllCourseCard from "../../components/AllCourseCard";
import AllCoursesShimmer from "../../components/Shimmers/AllCoursesShimmer";

const ActiveCourses = () => {

  const { myCourses, loading, setLoading } = useCourseStore();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearInterval(timer);
  }, [setLoading]);

  return (
    <div className="mt-20 min-h-screen sm:px-12">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-3 sm:px-5">
          {Array(6).fill(0).map((_, index) => (
            <AllCoursesShimmer key={index} />
          ))}
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10`}>
          {myCourses.map((course) => (
            <div key={course.id} className="rounded-2xl shadow-md bg-gradient-to-t from-slate-900 to-slate-700 pb-4 overflow-hidden">
              <AllCourseCard course={course} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ActiveCourses


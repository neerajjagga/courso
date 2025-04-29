import { Search, X } from "lucide-react";
import CourseCard from "../../components/dashboard/common/CourseCard";
import CourseCardSkeleton from "../../components/skeletons/InstructorCourseCardSkeleton";
import { useNavigate } from "react-router-dom";
import { categories } from "../../constants/categories";
import { useEffect, useRef, useState } from "react";
import { useFetchCourses } from '../../hooks/course/useFetchCourses';

const AllCourses = () => {
  const navigate = useNavigate();
  const categoriesRef = useRef();
  const [isCategoriesDropDownOpened, setIsCategoriesDropDownOpened] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: courses, isPending } = useFetchCourses({
    ...(selectedCategory && { category: selectedCategory.for }),
    ...(debouncedSearch && { search: debouncedSearch }),
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesDropDownOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full px-3 min-h-dvh sm:px-10">
      <div className="flex flex-col gap-2">
        <div className='sticky top-0 z-10 flex flex-col items-center justify-between w-full'>
          <div className='flex w-full gap-2'>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="w-full px-5 md:py-2 py-[0.4rem] md:px-10 rounded-2xl input-primary"
              placeholder="Search for anything"
            />
            <button
              disabled={!search.trim()}
              onClick={() => setDebouncedSearch(search)}
              className={`flex items-center justify-center rounded-full ${!search.trim() ? "btn-primary-disabled" : "btn-primary"} `}>
              <Search size={20} />
            </button>
          </div>
          <div className="flex self-start gap-8 px-6 py-2 ml-4 bg-gray-700 sm:px-8 sm:py-3 rounded-b-xl bg-opacity-40 sm:self-auto sm:ml-0">
            <div ref={categoriesRef} className="relative">
              <button
                onClick={() => setIsCategoriesDropDownOpened(!isCategoriesDropDownOpened)}
                className="text-blue-500">Explore by category</button>

              {isCategoriesDropDownOpened && (
                <div
                  className="absolute z-50 flex flex-col gap-2 px-4 py-4 overflow-auto transition-all duration-200 bg-gray-800 rounded-lg h-[400px] sm:-right-48 -right-32">
                  {categories.slice(1).map((category, index) => (
                    <button
                      onClick={() => {
                        if (selectedCategory?.for !== category.for) {
                          setSelectedCategory(category);
                        }
                        setIsCategoriesDropDownOpened(false);
                      }}
                      key={index}
                      className="px-4 py-2 text-left text-white transition-all duration-200 ease-in rounded-md hover:bg-gray-700">
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex">
          {selectedCategory && (
            <div className="flex items-center justify-center gap-2 btn-primary">
              {selectedCategory.name}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                }}
                className=""><X /></button>
            </div>
          )}
        </div>

        <div className='flex flex-wrap justify-center gap-8 sm:pt-4 sm:justify-start'>
          {!isPending ? (
            (courses ?? []).length > 0 ? (
              courses.map((course, index) => (
                <CourseCard key={index} course={course}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/dashboard/course/${course.titleSlug}`);
                    }}
                    className="btn-secondary"
                  >
                    View Details
                  </button>
                </CourseCard>
              ))
            ) : (
              <div className="w-full py-10 text-2xl text-center text-gray-300 md:text-3xl">
                No courses found.
              </div>
            )
          ) : (
            new Array(4).fill(0).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))
          )}
        </div>
      </div>
    </div >
  )
}

export default AllCourses
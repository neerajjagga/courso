import { useEffect, useState } from 'react';
import { useCourseStore } from './../../stores/useCourseStore';
import { Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import MyCoursesCard from '../../components/MyCoursesCard';
import MyCoursesShimmer from '../../components/Shimmers/MyCoursesShimmer';

const MyCourses = ({ isSidebarActive }) => {
  const { myCourses, loading } = useCourseStore();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [searchError, setSearchError] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = () => {
    setIsSearchActive(true);
    setSearchError('');
    const trimmedSearch = search.trim();
    if (!trimmedSearch) {
      setFilteredCourses(myCourses);
      return;
    }
    const searchedCourses = myCourses.filter(course =>
      course.title.toLowerCase().includes(trimmedSearch.toLowerCase())
    );
    if (searchedCourses.length === 0) {
      setSearchError(`No courses found with "${trimmedSearch}"`);
      setFilteredCourses([]);
      return;
    }
    setFilteredCourses(searchedCourses);
  }

  const removeSearchFilter = () => {
    setFilteredCourses(myCourses);
    setSearchError('');
    setIsSearchActive(false);
    setSearch('');
  }

  useEffect(() => {
    setFilteredCourses(myCourses)
  }, [myCourses]);

  return (
    <>
      <div className="min-h-screen w-full py-3 px-4 lg:px-10 mt-16 flex flex-col gap-8">
        <div>
          <span className="text-4xl font-bold">
            My <span className="text-blue-500">Courses</span>
          </span>
        </div>

        <div className='flex gap-2 '>
          <input
            disabled={myCourses.length === 0}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className='bg-gray-900 border border-gray-700 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-1 px-4 focus:outline-dotted w-full text-md sm:w:1/2 md:w-1/3' placeholder='Search your courses' />
          <button
            disabled={myCourses.length === 0}
            onClick={handleSearch}
            className='bg-blue-600 rounded-md px-4 py-2 shadow-sm transition-all ease-in hover:bg-blue-500'>
            <Search />
          </button>
          {isSearchActive && search && (
            <motion.button
              onClick={removeSearchFilter}
              className='bg-red-600 rounded-md px-4 shadow-sm transition-all ease-in duration-300 hover:bg-red-500'>
              <X />
            </motion.button>
          )}
        </div>

        {searchError && (
          <span className='text-3xl font-semibold text-center text-red-500'>{searchError}</span>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-3 px-5">
            {Array(6).fill(0).map((_, index) => (
              <MyCoursesShimmer key={index} />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className={`grid ${isSidebarActive ? "grid-cols-1 md:grid-cols-1 lg:grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}  gap-6`}>
            {filteredCourses.map((course) => (
              <div key={course.id} className="rounded-2xl shadow-md bg-gradient-to-t from-slate-900 to-slate-700 pb-4 overflow-hidden">
                <MyCoursesCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-5 text-center w-full py-3 px-5 mt-16">
            <span className="text-4xl font-bold">
              You have no <span className='text-blue-500'>Courses</span> yet
            </span>
            <button className='btn-primary py-2 px-6 rounded-sm text-2xl'>Create now</button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCourses;

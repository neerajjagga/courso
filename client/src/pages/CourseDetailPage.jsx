
import { ChevronRight, Star, Users } from 'lucide-react';
import { useCourseStore } from './../stores/useCourseStore';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CourseDetailPage = () => {

  const [showFullDesc, setShowFullDesc] = useState(false);

  const { titleSlug } = useParams();
  const { allCourses, selectedCourse, setSelectedCourse } = useCourseStore();

  useEffect(() => {
    const selectedCourse = allCourses.find(course => course.titleSlug === titleSlug);
    setSelectedCourse(selectedCourse);
  }, [allCourses, setSelectedCourse]);

  return (
    <div className='min-h-screen w-full mt-16'>
      <div className='flex flex-col'>
        <section className='bg-neutral-800 py-5 px-10 pb-10'>
          <div className='flex items-center gap-1 font-semibold text-gray-300 truncate'>
            <Link to={'/'} className='underline'>Home</Link>
            <ChevronRight size={20} />
            <Link to={'/courses'} className='underline'>Courses</Link>
            <ChevronRight size={20} />
            <span>{selectedCourse?.title}</span>
          </div>

          <div className='flex flex-col gap-5 mt-10'>
            <span className='text-3xl font-bold'>{selectedCourse.title}</span>
            {selectedCourse.subtitle && (
              <span className='text-lg text-gray-300'>{selectedCourse.subtitle}</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4 text-gray-300 text-sm sm:text-lg mt-5">
            <span className="bg-gray-800 px-3 py-1 rounded-full">📚 {selectedCourse.level.charAt(0).toUpperCase()}{selectedCourse.level.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full">🌎 {selectedCourse.language}</span>
            <span className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
              <Users size={16} /> {selectedCourse.students.length || "0"} Students
            </span>
            <span className="bg-gray-800 px-3 py-1 rounded-full flex items-center gap-1">
              <Star size={16} className="text-yellow-400" /> {selectedCourse.reviews.length || "0"} Reviews
            </span>
          </div>
        </section>
        <section className='px-10 mt-5 flex flex-col gap-5'>
          {selectedCourse.description && (
            <div className='flex flex-col gap-2'>
              <span className='text-2xl font-semibold'>Description:</span>
              <span className='font-extralight'>
                {showFullDesc ? (
                  <>
                    <span>{selectedCourse.description}</span>
                    <a onClick={() => setShowFullDesc(prev => !prev)} className='text-blue-500 cursor-pointer font-semibold'> show less</a>
                  </>
                ) : (
                  <>
                    {selectedCourse.description.slice(0, 800)}
                    <a onClick={() => setShowFullDesc(prev => !prev)} className='text-blue-500 cursor-pointer font-semibold'> show more</a>
                  </>
                )}
              </span>
            </div>
          )}

          <div className='flex flex-col gap-2'>
            <span className='text-2xl font-semibold'>Instructor:</span>
          </div>
        </section>
      </div >
    </div >
  )
}

export default CourseDetailPage;

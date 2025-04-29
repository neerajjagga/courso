import { useNavigate } from 'react-router-dom';
import CustomLoader from '../../components/common/CustomLoader';
import { useFetchEnrolledCourses } from '../../hooks/enrolledCourse/useFetchEnrolledCourses';

const Enrollments = () => {
  const { data: courses, isPending } = useFetchEnrolledCourses();
  const navigate = useNavigate();

  if (isPending) return <CustomLoader />

  return (
    <div className='w-full px-3 md:pt-2 sm:px-10'>
      <div className="flex flex-col gap-2 md:gap-6">
        <div className='text-[1.2rem] font-bold xs:text-[1.3rem] sm:text-3xl px-2 pb-2 border-b border-opacity-30 border-b-gray-500 flex justify-between items-center'>
          <h2>My Enrollments</h2>
        </div>

        {(courses ?? []).length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-[300px] gap-4 text-white text-center">
            <p className="text-lg text-gray-300 sm:text-3xl">You haven't enrolled in any courses yet.</p>
            <button
              onClick={() => navigate('/dashboard/courses')}
              className="btn-secondary"
            >
              Explore Courses
            </button>
          </div>
        ) : (
          <main className='flex flex-wrap justify-center gap-10 md:justify-normal'>
            {courses.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/learn/${item.course.titleSlug}`)}
                className="cursor-pointer rounded-xl overflow-hidden bg-[#1e1e1e] hover:shadow-xl transition-all duration-200 w-[320px] max-h-[500px] flex flex-col"
              >
                <div className="w-full h-[180px]">
                  <img
                    src={
                      item.course.courseImageUrl ||
                      'https://res.cloudinary.com/dabywmj68/image/upload/t_placeholder/v1738051049/placeholder_pg74id.webp'
                    }
                    alt={item.course.title}
                    className="object-cover w-full h-full pointer-events-none"
                  />
                </div>

                <div className="flex flex-col justify-between flex-grow gap-2 p-2 md:p-4">
                  <div className='flex flex-col flex-grow gap-2 text-white'>
                    <h3 className="text-lg font-bold lg:text-xl">{item.course.title}</h3>
                    <div className='flex items-center gap-2 mt-2 overflow-hidden'>
                      {item.course.instructor.profileImageUrl && (
                        <img
                          src={item.course.instructor?.profileImageUrl}
                          className='object-cover rounded-full w-7 h-7'
                          alt={`${item.course.instructor.fullname} Profile Image`}
                        />
                      )}
                      <h4 className='text-sm text-gray-300 line-clamp-1'>{item.course.instructor.fullname}</h4>
                    </div>
                  </div>
                </div>

                <div className='w-full'>
                  <div className="w-full h-[0.38rem] bg-gray-600">
                    <div className='h-full bg-blue-600 rounded-tr-3xl rounded-br-3xl'
                      style={{ width: `${item.progressSummary.percentage || 0}%` }}
                    >
                    </div>
                  </div>
                  <p className='px-2 py-2 text-sm text-gray-100'>{item.progressSummary.percentage}% Completed</p>
                </div>
              </div>
            ))}
          </main>
        )}
      </div>
    </div>
  );
};

export default Enrollments;

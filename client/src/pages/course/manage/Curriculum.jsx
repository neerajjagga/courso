import { useParams } from "react-router-dom";
import { useFetchSingleCourse } from "../../../hooks/useFetchSingleCourse";
import { Loader, Plus } from "lucide-react";
import { NewSection } from '../../../components/NewSection';
import { useState } from "react";

const Curriculum = () => {
  const { courseId } = useParams();
  const { data: course, isPending } = useFetchSingleCourse(courseId);
  const [showNewSection, setShowNewSection] = useState(false);

  return (
    <div className="flex flex-col h-full gap-5 border border-gray-400 rounded-lg shadow-2xl md:gap-10 border-opacity-20 shadow-gray-800">
      <div className='flex flex-col justify-between gap-2 px-4 py-3 text-center border-b border-gray-400 md:py-5 xs:flex-row sm:px-6 border-opacity-20 sm:gap-0'>
        <h2 className='text-2xl sm:text-3xl'>Curriculum</h2>
        <div className='flex flex-col items-center gap-3 sm:flex-row sm:gap-2'>
          <button onClick={() => setShowNewSection(true)} className="btn-special"><Plus /> Section</button>
        </div>
      </div>

      {!isPending ? (
        <div className='flex flex-col flex-wrap gap-6 px-4 pb-6 md:gap-10 sm:px-6 sm:pb-10'>
          {course.modules.length !== 0 ? (
            hjghjghj
            // first render modules
          ) : (
            <div className="mt-12 text-3xl text-center">
              No Sections or module
            </div>
          )}
          {showNewSection && (
            <NewSection />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Loader size={40} className="animate-spin" />
        </div>
      )}
    </div>
  )
}

export default Curriculum
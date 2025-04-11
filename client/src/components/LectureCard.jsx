import { FileText, Plus, ChevronDown, Video } from "lucide-react"
import { useState } from "react"
import DescriptionTextEditor from './DescriptionTextEditor';
import { useEditLecture } from '../hooks/useEditLecture';
import { Loader } from 'lucide-react';
import AddContent from "./AddContent";

const LectureCard = ({ lecture }) => {
  const [isDropDownEnabled, setIsDropDownEnabled] = useState(false);
  const [isDescriptionDialogOpened, setIsDescriptionDialogOpened] = useState(false);
  const [isAddContentDialogOpened, setIsAddContentDialogOpened] = useState(false);

  const [description, setDescription] = useState('');

  const { mutate: editLecture, isPending } = useEditLecture();

  return (
    <div className="flex flex-col gap-6 px-6 py-6 pb-6 bg-gray-500 rounded-md bg-opacity-20">
      <div className="flex items-center justify-between w-full">
        <div>
          <h3 className="flex gap-5">
            <span className="text-xl text-gray-300">Lecture:</span>
            <span className="flex items-center gap-2 text-lg">
              {lecture.videoUrl ? <Video size={20} /> : <FileText size={20} />}
              {lecture.title}</span>
          </h3>
        </div>

        <div className="flex gap-3">
          {!lecture.videoUrl && (
            <button
              onClick={() => {
                if (isDescriptionDialogOpened) setIsDescriptionDialogOpened(false);
                setIsAddContentDialogOpened(!isAddContentDialogOpened)
              }}
              className="flex items-center justify-center gap-2 btn-special">
              <span className={`${isAddContentDialogOpened && "rotate-45"} transition-all ease-in-out duration-200`}><Plus /></span> Content
            </button>
          )}
          <button
            disabled={isAddContentDialogOpened}
            onClick={() => setIsDropDownEnabled(!isDropDownEnabled)}
            className={`${isDropDownEnabled && "rotate-180"} ${isAddContentDialogOpened ? "text-[#72757c]" : "text-[#3e75f3]"} transition-all ease-in-out duration-300`}>
            <ChevronDown />
          </button>
        </div>
      </div>

      {(isDropDownEnabled && !isAddContentDialogOpened) && (
        <div className="flex flex-col items-start gap-3">
          {!isDescriptionDialogOpened ? (
            <button
              onClick={() => setIsDescriptionDialogOpened(true)}
              className="flex items-center justify-center gap-2 btn-special">
              <Plus /> Description
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <DescriptionTextEditor
                setDescription={setDescription}
              />
              <div className='flex items-center self-end gap-4'>
                <button
                  disabled={isPending}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDescriptionDialogOpened(false);
                  }}
                  className={`${!isPending ? "btn-primary" : "btn-primary-disabled"}`}>
                  Cancel
                </button>

                <button
                  onClick={() => editLecture({ lectureId: lecture.id, data: { description } })}
                  disabled={!description.trim()}
                  type='submit'
                  className={`${description.trim() ? "btn-safe" : "btn-safe-disabled"} flex justify-center items-center gap-2`}>
                  Save
                  {isPending && <span><Loader className="animate-spin" size={22} /></span>}
                </button>
              </div>
            </div>
          )}
          <button
            // onClick={() => setShowAddCurriculum(true)}
            disabled
            className="flex items-center justify-center gap-2 btn-primary-disabled">
            <Plus /> Resources
          </button>
        </div>
      )}

      {isAddContentDialogOpened &&
        <AddContent
          setIsAddContentDialogOpened={setIsAddContentDialogOpened}
          lectureId={lecture.id}
        />}
    </div>
  )
}

export default LectureCard
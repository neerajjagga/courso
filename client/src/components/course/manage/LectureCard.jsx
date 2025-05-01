import { FileText, Plus, ChevronDown, Video, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Loader } from 'lucide-react';
import AddContent from "./AddContent";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import DescriptionTextEditor from '../../DescriptionTextEditor';
import { useEditLecture } from "../../../hooks/lecture/useEditLecture";

const LectureCard = ({ lecture }) => {
  const [isDropDownEnabled, setIsDropDownEnabled] = useState(false);
  const [isDescriptionDialogOpened, setIsDescriptionDialogOpened] = useState(false);
  const [isAddContentDialogOpened, setIsAddContentDialogOpened] = useState(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const [description, setDescription] = useState('');

  const { mutate: editLecture, isPending } = useEditLecture(setIsDescriptionDialogOpened);

  useEffect(() => {
    if (isDeleteClicked) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isDeleteClicked]);

  return (
    <div className="flex flex-col gap-6 px-2 py-6 pb-6 bg-gray-500 rounded-md shadow-xl sm:px-6 bg-opacity-15">
      <div className="flex flex-col justify-between w-full gap-2 md:gap-4 xl:items-center xl:flex-row xl:gap-0">
        <div className="flex gap-4 group">
          <h3 className="relative flex items-center gap-5">
            <span className="text-lg text-gray-300 sm:text-xl shrink-0">Lecture:</span>
            <span className="flex items-center gap-2 text-lg truncate overflow-hidden whitespace-nowrap max-w-[150px] sm:max-w-[300px] xl:max-w-[400px] 2xl:w-full text-ellipsis">
              <span>
                {lecture.videoUrl ? <Video size={20} /> : <FileText size={20} />}
              </span>
              <span className="text-sm sm:text-base">{lecture.title}</span>
            </span>
          </h3>
          <button
            onClick={() => setIsDeleteClicked(true)}
            className="transition-all duration-200 ease-in ">
            <Trash2 size={20} className="text-red-500" />
          </button>
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
                initialDescription={lecture.description}
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
                  disabled={!description.trim() || isPending}
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

      {isDeleteClicked && (
        <DeleteConfirmDialog
          type="lecture"
          contentId={lecture.id}
          setIsDeleteClicked={setIsDeleteClicked}
        />
      )}
    </div>
  )
}

export default LectureCard
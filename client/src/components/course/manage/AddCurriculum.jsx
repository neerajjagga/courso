import { useState } from 'react';
import { Loader } from 'lucide-react';
import { useCreateLecture } from '../../../hooks/lecture/useCreateLecture';

const MAX_TITLE_LENGTH = 60;

const AddCurriculum = ({ setShowAddCurriculum, moduleId }) => {

  const [title, setTitle] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [isPaid, setIsPaid] = useState(true);
  const { mutate: createLecture, isPending, isSuccess } = useCreateLecture();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      createLecture({
        title,
        isFreePreview: isFree,
        moduleId
      });
    }
  };

  if (isSuccess) setShowAddCurriculum(false);

  return (
    <div className='w-full px-2 py-4 bg-gray-500 rounded-md sm:px-6 bg-opacity-15'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <div className='flex flex-col gap-4 sm:gap-6 sm:items-center sm:flex-row'>
          <label htmlFor="new-section" className='text-base font-bold sm:text-xl'>New Lecture:</label>
          <input
            type="text"
            className='flex-1 input-primary'
            placeholder='Enter title'
            value={title}
            maxLength={60}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-3 sm:gap-6 sm:items-center sm:flex-row'>
          <label className='text-base font-bold sm:text-xl'>Preview:</label>

          <div className='flex gap-4'>
            <div className='flex gap-2'>
              <input
                type="radio"
                id="free"
                name="previewType"
                className="w-5 h-5 accent-blue-600"
                checked={!isPaid}
                onChange={() => {
                  setIsFree(true);
                  setIsPaid(false);
                }}
              />
              <label htmlFor="free" className='text-base'>Free</label>
            </div>

            <div className='flex gap-2'>
              <input
                type="radio"
                id="paid"
                name="previewType"
                className="w-5 h-5 accent-blue-600"
                checked={isPaid}
                onChange={() => {
                  setIsPaid(true);
                  setIsFree(false);
                }}
              />
              <label htmlFor="paid" className='text-base'>Paid</label>
            </div>
          </div>
        </div>


        <div className='flex items-center self-end gap-4'>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowAddCurriculum(false);
            }}
            className='btn-primary'>
            Cancel
          </button>

          <button
            disabled={!title.trim()}
            type='submit'
            className={`${title.trim() ? "btn-secondary" : "btn-secondary-disabled"} flex justify-center items-center gap-2`}>
            Add Lecture
            {isPending && <span><Loader className="animate-spin" size={22} /></span>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCurriculum


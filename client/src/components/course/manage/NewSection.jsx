import { useState } from 'react';
import { Loader } from 'lucide-react';
import { useCreateModule } from '../../../hooks/module/useCreateModule';

const MAX_TITLE_LENGTH = 60;

export const NewSection = ({ setShowNewSection, courseId }) => {
    const [title, setTitle] = useState('');
    const { mutate: createModule, isPending, isSuccess } = useCreateModule();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            createModule({
                title,
                courseId
            });
        }
    };

    if (isSuccess) setShowNewSection(false);

    return (
        <div className='w-full px-4 py-4 bg-gray-500 rounded-md sm:px-6 bg-opacity-20'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4 sm:gap-6 sm:items-center sm:flex-row'>
                    <label htmlFor="new-section" className='text-base font-bold sm:text-xl'>New Section:</label>
                    <input
                        type="text"
                        className='flex-1 input-primary'
                        placeholder='Enter title'
                        value={title}
                        maxLength={60}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='flex items-center self-end gap-4'>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setShowNewSection(false);
                        }}
                        className='btn-primary'>
                        Cancel
                    </button>

                    <button
                        disabled={!title.trim()}
                        type='submit'
                        className={`${title.trim() ? "btn-secondary" : "btn-secondary-disabled"} flex justify-center items-center gap-2`}>
                        Add
                        {isPending && <span><Loader className="animate-spin" size={22} /></span>}
                    </button>
                </div>
            </form>
        </div>
    );
}


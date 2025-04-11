import { useState } from 'react';
import { useCreateModule } from '../hooks/useCreateModule';
import { Loader } from 'lucide-react';

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

    if(isSuccess) setShowNewSection(false);

    return (
        <div className='w-full px-6 py-4 bg-gray-500 rounded-md bg-opacity-20'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <div className='flex items-center gap-4'>
                    <label htmlFor="new-section" className='text-xl font-bold'>New Section:</label>
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


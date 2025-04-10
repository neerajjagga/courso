import { useState } from 'react';

const MAX_TITLE_LENGTH = 60;

export const NewSection = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            // onAdd({ title });
            // setTitle('');
        }
    };
    return (
        <div>
            <form>
                fhgfhgfhghg
            </form>
        </div>
    );
}


import { Twitter, Linkedin, Facebook, Github, Instagram } from 'lucide-react';

const InstructorCard = ({ instructor }) => {
    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <div className='p-1 border border-blue-500 rounded-full w-fit'>
                {instructor.profileImageUrl ? (
                    <img
                        src={instructor.profileImageUrl}
                        alt={`${instructor.fullname} Profile Image`}
                        className='md:w-[200px] md:h-[200px] w-[100px] h-[100px] rounded-full object-cover'
                    />
                ) : (
                    <span className='flex items-center justify-center w-16 h-16 text-3xl font-bold text-white bg-red-600 rounded-full'>
                        {instructor.fullname?.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>

            <div className='text-center'>
                <h3 className='text-lg font-bold md:text-4xl'>{instructor.fullname}</h3>
                <h4 className='text-base text-gray-300 md:text-lg'>{instructor.bio}</h4>

                {instructor.socialLinks?.some(link => link.username) && (
                    <div className="flex items-center justify-center gap-8 p-3 px-6 mt-4 bg-gray-900 border border-gray-700 rounded-full">
                        {instructor.socialLinks.map((item, index) => {
                            const { url, username } = item;
                            if (!username) return null;

                            const icons = {
                                twitter: <Twitter size={20} className="hover:text-blue-500" />,
                                linkedin: <Linkedin size={20} className="hover:text-blue-500" />,
                                facebook: <Facebook size={20} className="hover:text-blue-500" />,
                                instagram: <Instagram size={20} className="hover:text-blue-500" />,
                                github: <Github size={20} className="hover:text-blue-500" />,
                            };

                            return (
                                <a
                                    key={index}
                                    href={`${url}/${username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 transition-transform duration-300 ease-in-out hover:scale-110"
                                >
                                    {icons[item.name]}
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default InstructorCard
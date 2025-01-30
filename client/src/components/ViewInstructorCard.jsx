import { Facebook, Github, Linkedin, Twitter } from 'lucide-react'

const ViewInstructorCard = ({ instructor }) => {

    return (
        <div className="h-full flex flex-col items-center">
            <div className="flex flex-col items-center border-b-2 border-gray-800 w-full pb-4 gap-1">
                <span className="text-2xl font-bold">Instructor</span>
            </div>

            <section className="mt-5 w-full flex justify-center">
                <div className="flex flex-col items-center sm:px-10 px-5 py-4 rounded-md bg-gradient-to-b from-slate-900 to-gray-800 shadow-2xl w-[90%] md:w-[50%] md:max-w-[50%]">
                    <div>
                        {instructor.profileImageUrl ? (
                            <div className="relative">
                                <img
                                    className="h-36 w-36 rounded-full object-cover  transition-all ease shadow-md shadow-black border-2"
                                    src={instructor.profileImageUrl}
                                    alt={instructor.fullname}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-full"></div>
                            </div>
                        ) : (
                            <div className="h-36 w-36 bg-blue-950 text-5xl text-white rounded-full flex items-center justify-center font-semibold transition-all ease shadow-md shadow-black border-2">
                                {instructor.fullname.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="mt-2 flex flex-col gap-1 items-center">
                        <span className="text-2xl font-semibold">{instructor.fullname}</span>
                        {instructor.headline && (
                            <span className="text-lg text-blue-300 font-semibold w-full line-clamp-1 sm:line-clamp-2">{instructor.headline}</span>
                        )}
                        {instructor.biography && (
                            <span className="text-sm text-gray-400 font-semibold line-clamp-2">{instructor.biography}</span>
                        )}
                    </div>
                    <div className="flex gap-4 mt-3 bg-black bg-opacity-80 p-2 px-6 rounded-full">
                        {instructor.socialLinks.map((item, index) => {
                            const { name, url, username } = item;

                            if (!username) return null;

                            const icons = {
                                Twitter: <Twitter size={20} />,
                                LinkedIn: <Linkedin size={20} />,
                                Facebook: <Facebook size={20} />,
                                Github: <Github size={20} />,
                            };

                            return (
                                <a
                                    className="text-blue-600"
                                    key={index}
                                    href={`${url}/${username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {icons[name]}
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ViewInstructorCard

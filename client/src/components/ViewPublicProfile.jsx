import { useUserStore } from "../stores/useUserStore";
import { Facebook, Github, Linkedin, Twitter } from 'lucide-react'

const ViewPublicProfile = () => {
    const { user } = useUserStore();

    return (
        <div className="h-full flex flex-col items-center">
            <div className="flex flex-col items-center border-b-2 w-full pb-4 gap-1">
                <span className="text-2xl font-bold">View Profile</span>
                <span className="text-gray-300">View your public profile</span>
            </div>

            <section className="mt-5 w-full flex justify-center">
                <div className="flex flex-col items-center bg-gray-600 px-10 py-4 rounded-md bg-gradient-to-l from-slate-900 via-slate-600 to-slate-900 shadow-2xl w-[90%] md:w-[50%] sm:w-[80%]">
                    <div>
                        {user.profileImageUrl ? (
                            <div className="relative">
                                <img
                                    className="h-36 w-36 rounded-full object-cover  transition-all ease shadow-md shadow-black border-2"
                                    src={user.profileImageUrl}
                                    alt={user.fullname}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-full"></div>
                            </div>
                        ) : (
                            <div className="h-36 w-36 bg-blue-950 text-5xl text-white rounded-full flex items-center justify-center font-semibold transition-all ease shadow-md shadow-black border-2">
                                {user.fullname.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="mt-2 flex flex-col gap-1 items-center">
                        <span className="text-2xl font-semibold">{user.fullname}</span>
                        {user.headline && (
                            <span className="text-lg text-black font-semibold">{user.headline}</span>
                        )}
                        {user.role === "instructor" && (
                            user.biography && (
                                <span className="text-sm text-gray-400 font-semibold">{user.biography.slice(0, 80)}...</span>
                            )
                        )}
                    </div>


                    {user.socialLinks.some(link => link.username) && (
                        <div className="flex gap-4 mt-3 bg-black p-2 px-6 rounded-full">
                            {user.socialLinks.map((item, index) => {
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
                    )}
                </div>
            </section>
        </div>
    )
}

export default ViewPublicProfile
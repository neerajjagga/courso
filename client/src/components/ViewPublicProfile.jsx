import { useUserStore } from "../stores/useUserStore";
import { Facebook, Github, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom';

const ViewPublicProfile = () => {
    const { user } = useUserStore();

    return (
        <div className="h-full flex flex-col items-center">
            <div className="flex flex-col items-center border-b-2 w-full pb-4 gap-1">
                <span className="text-2xl font-bold">View Profile</span>
                <span className="text-gray-300">View your public profile</span>
            </div>

            <section className="mt-5 w-full flex justify-center">
                <div className="flex flex-col items-center bg-gray-600 px-10 py-4 rounded-md bg-gradient-to-b from-slate-900 to-slate-700 shadow-2xl w-[90%] md:w-[50%] sm:w-[80%]">
                    <div>
                        {user.profileImageUrl ? (
                            <img
                                className="h-36 w-36 rounded-full object-cover  transition-all ease shadow-md shadow-black border-2"
                                src={user.profileImageUrl}
                                alt={user.fullname}
                            />
                        ) : (
                            <div className="h-36 w-36 bg-blue-950 text-5xl text-white rounded-full flex items-center justify-center font-semibold transition-all ease shadow-md shadow-black border-2">
                                {user.fullname.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                    <div className="mt-2 flex flex-col gap-1 items-center">
                        <span className="text-2xl font-semibold">{user.fullname}</span>
                        {user.bio && (
                            <span className="text-sm text-gray-400 font-semibold">{user.bio}</span>
                        )}
                    </div>
                    <div className="flex gap-4 mt-3 bg-black p-2 px-6 rounded-full">
                        {user.socialLinks.length > 0 &&
                            user.socialLinks.map((item, index) => {

                                const { name, url } = item;
                                const username = url.split('.com/')[1];

                                if (!username) return null;

                                const icons = {
                                    Twitter: <Twitter size={20} />,
                                    LinkedIn: <Linkedin size={20} />,
                                    Facebook: <Facebook size={20} />,
                                    Github: <Github size={20} />,
                                };

                                return (
                                    <a className="text-blue-600" key={index} href={url} target="_blank" rel="noopener noreferrer">
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

export default ViewPublicProfile
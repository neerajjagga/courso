import { useUserStore } from "../stores/useUserStore";
import { Facebook, Github, Linkedin, Twitter } from 'lucide-react';

const ViewPublicProfile = () => {
    const { user } = useUserStore();

    return (
        <div className="h-full flex flex-col items-center bg-gray-900 min-h-screen py-10 px-4">
            {/* Header */}
            <div className="flex flex-col items-center border-b border-gray-700 w-full pb-4 gap-1">
                <span className="text-3xl font-bold text-white">View Profile</span>
                <span className="text-gray-400">View your public profile</span>
            </div>

            {/* Profile Card */}
            <section className="mt-8 w-full flex justify-center">
                <div className="flex flex-col items-center bg-gray-800 px-10 py-6 rounded-lg bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl w-[90%] md:w-[50%] sm:w-[80%] border border-gray-700">

                    {/* Profile Image */}
                    <div className="relative group">
                        {user.profileImageUrl ? (
                            <img
                                className="h-36 w-36 rounded-full object-cover shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 border-2 border-gray-700"
                                src={user.profileImageUrl}
                                alt={user.fullname}
                            />
                        ) : (
                            <div className="h-36 w-36 bg-blue-700 text-5xl text-white rounded-full flex items-center justify-center font-semibold shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 border-2 border-gray-700">
                                {user.fullname.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-full"></div>
                    </div>

                    {/* User Info */}
                    <div className="mt-3 flex flex-col gap-1 items-center">
                        <span className="text-2xl font-semibold text-white">{user.fullname}</span>
                        {user.headline && (
                            <span className="text-lg text-gray-400">{user.headline}</span>
                        )}
                        {user.role === "instructor" && user.biography && (
                            <p className="text-sm text-gray-300 mt-2 text-center px-4">
                                {user.biography.slice(0, 80)}...
                            </p>
                        )}
                    </div>

                    {/* Social Links */}
                    {user.socialLinks?.some(link => link.username) && (
                        <div className="flex gap-4 mt-4 bg-gray-900 p-3 px-6 rounded-full border border-gray-700">
                            {user.socialLinks.map((item, index) => {
                                const { name, url, username } = item;
                                if (!username) return null;

                                const icons = {
                                    Twitter: <Twitter size={20} className="hover:text-blue-500" />,
                                    LinkedIn: <Linkedin size={20} className="hover:text-blue-500" />,
                                    Facebook: <Facebook size={20} className="hover:text-blue-500" />,
                                    Github: <Github size={20} className="hover:text-blue-500" />,
                                };

                                return (
                                    <a
                                        key={index}
                                        href={`${url}/${username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-500 hover:scale-110 transition-transform duration-300 ease-in-out"
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
    );
};

export default ViewPublicProfile;

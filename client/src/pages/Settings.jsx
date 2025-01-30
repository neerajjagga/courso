import { useState } from 'react';
import SettingsMenu from '../components/SettingsMenu';
import { useUserStore } from '../stores/useUserStore';
import { Outlet, useLocation } from 'react-router-dom';

const Settings = () => {
    const { user } = useUserStore();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);

    return (
        <div className='flex justify-center pt-28 px-4 pb-10'>
            <div className="flex w-full max-w-6xl min-h-[80vh] bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">

                {/* Sidebar */}
                <section className="flex flex-col gap-5 items-center w-[25%] bg-gray-850 min-h-[80vh] pt-10 px-4 border-r border-gray-700">
                    {/* Profile Image */}
                    <div className="relative group">
                        {user.profileImageUrl ? (
                            <img
                                className="h-36 w-36 rounded-full object-cover shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                                src={user.profileImageUrl}
                                alt={user.fullname}
                            />
                        ) : (
                            <div className="h-36 w-36 bg-blue-700 text-5xl text-white rounded-full flex items-center justify-center font-semibold shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105">
                                {user.fullname.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-full"></div>
                    </div>

                    {/* User Info */}
                    <div className="text-center">
                        <span className="text-xl font-semibold text-white">{user.fullname}</span>
                        {user.headline && (
                            <span className="block text-sm italic text-gray-400 mt-1 px-2">{user.headline}</span>
                        )}
                    </div>

                    {/* Settings Menu */}
                    <div className="w-full mt-5">
                        <SettingsMenu activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </section>

                {/* Main Content */}
                <section className='w-[75%] bg-gray-900 p-6 rounded-xl'>
                    {location.pathname === '/s' ? (
                        <div className='h-full w-full flex justify-center items-center'>
                            <span className='text-4xl font-bold text-white'>
                                Settings
                            </span>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </section>

            </div>
        </div>
    )
}

export default Settings;

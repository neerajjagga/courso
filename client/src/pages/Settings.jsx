import { useState } from 'react';
import SettingsMenu from '../components/SettingsMenu';
import { useUserStore } from '../stores/useUserStore';
import { Outlet, useLocation } from 'react-router-dom';

const Settings = () => {
    const { user } = useUserStore();
    const [activeTab, setActiveTab] = useState('');
    const location = useLocation();

    return (
        <div className='flex justify-center pt-28'>
            <div className="flex w-[95%] lg:w-[80%] min-h-screen bg-gray-800 border-2 border-gray-600 rounded-md">

                <section className="flex flex-col gap-3 items-center w-[25%] bg-gray-700 min-h-screen pt-10">
                    <div>
                        {user.profileImageUrl ? (
                            <div className='relative'>
                                <img
                                    className="h-36 w-36 rounded-full object-cover transition-all ease shadow-md shadow-black"
                                    src={user.profileImageUrl}
                                    alt={user.fullname}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-full"></div>
                            </div>
                        ) : (
                            <div className="h-36 w-36 bg-blue-950 text-5xl text-white rounded-full flex items-center justify-center font-semibold hover:brightness-75 transition-all ease shadow-md shadow-black">
                                {user.fullname.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col items-center'>
                        <span className='text-xl font-bold text-white'>{user.fullname}</span>
                        {user.headline && (
                            <span className='text-lg italic text-black text-center'>{user.headline}</span>
                        )}
                    </div>

                    <div className="w-full mt-5">
                        <SettingsMenu activeTab={activeTab} setActiveTab={setActiveTab} />
                    </div>
                </section>

                <section className='mt-10 w-[75%] '>
                    {location.pathname === '/s' ? (
                        <div className='h-full w-full flex justify-center'>
                            <span className='text-5xl font-semibold'>
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

export default Settings
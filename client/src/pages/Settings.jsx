import EditProfile from '../components/EditProfile';
import EditPhoto from '../components/EditPhoto';
import ViewProfile from '../components/ViewProfile';
import CloseAccount from '../components/CloseAccount';
import SettingsMenu from '../components/SettingsMenu';
import { Link } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';
import { useState } from 'react';

const Settings = () => {
    const { user } = useUserStore();
    const [activeTab, setActiveTab] = useState('edit-profile');

    return (
        <div className="flex w-[95%] sm:w-[80%] min-h-screen mt-10 bg-gray-800 border-2">
            <section className="flex flex-col gap-3 items-center w-[25%] bg-gray-700 min-h-screen pt-10">
                <div>
                    {user.profileImageUrl ? (
                        <img
                            className="h-36 w-36 rounded-full object-cover hover:brightness-75 transition-all ease shadow-md shadow-black"
                            src={user.profileImageUrl}
                            alt={user.fullname}
                        />
                    ) : (
                        <div className="h-36 w-36 bg-blue-950 text-5xl text-white rounded-full flex items-center justify-center font-semibold hover:brightness-75 transition-all ease shadow-md shadow-black">
                            {user.fullname.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className='flex flex-col items-center'>
                    <span className='text-xl font-bold text-white'>{user.fullname}</span>
                    {user.bio && (
                        <span className='text-lg italic text-black text-center'>{user.bio}</span>
                    )}
                </div>

                <div className="w-full mt-5">
                    <SettingsMenu activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
            </section>

            <section className='mt-10 w-[75%] '>
                {activeTab === "edit-profile" && <EditProfile />}
                {activeTab === "view-profile" && <ViewProfile />}
                {activeTab === "photo" && <EditPhoto />}
                {activeTab === "close-account" && <CloseAccount />}
            </section>
        </div>
    )
}

export default Settings
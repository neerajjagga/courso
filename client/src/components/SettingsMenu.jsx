import { Link } from "react-router-dom"

const SettingsMenu = ({ activeTab, setActiveTab }) => {
    return (
        <ul className="flex flex-col gap-0 border-y border-gray-600">
            <li onClick={() => setActiveTab('view-profile')} className={activeTab === 'view-profile' ? "hover:bg-slate-600 bg-slate-800 py-2 px-4 border-b border-gray-600 last:border-none" : "hover:bg-slate-600 py-2 px-4 border-b border-gray-600 last:border-none cursor-pointer"}>
                <Link>View public profile</Link>
            </li>

            <li onClick={() => setActiveTab('edit-profile')} className={activeTab === 'edit-profile' ? "hover:bg-slate-600 bg-slate-800 py-2 px-4 border-b border-gray-600 last:border-none" : "hover:bg-slate-600 py-2 px-4 border-b border-gray-600 last:border-none cursor-pointer"}>
                <Link>Edit profile</Link>
            </li>

            <li onClick={() => setActiveTab('photo')} className={activeTab === 'photo' ? "hover:bg-slate-600 bg-slate-800 py-2 px-4 border-b border-gray-600 last:border-none" : "hover:bg-slate-600 py-2 px-4 border-b border-gray-600 last:border-none cursor-pointer"}>
                <Link>Photo</Link>
            </li>

            <li onClick={() => setActiveTab('close-account')} className={activeTab === 'close-account' ? "hover:bg-slate-600 bg-slate-800 py-2 px-4 border-b border-gray-600 last:border-none" : "hover:bg-slate-600 py-2 px-4 border-b border-gray-600 last:border-none cursor-pointer"}>
                <Link className='text-red-500'>Close Account</Link>
            </li>
        </ul>
    )
}

export default SettingsMenu
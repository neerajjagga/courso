import { Link } from "react-router-dom"
import { useUserStore } from "../stores/useUserStore"

const ProfileDropdown = ({ profileDropdown, user }) => {
    const { logout, loading } = useUserStore();

    function handleLogout() {
        logout();
    }

    return (
        <div>
            {profileDropdown && (
                <ul className="bg-gray-700 absolute right-0 menu menu-sm dropdown-content flex flex-col gap-2 items-center rounded-box mt-2 w-60 shadow overflow-hidden">
                    <li className="w-full bg-gray-800 rounded-box py-1 shadow-sm shadow-black truncate">
                        <a>
                            <div className="flex items-center gap-3">
                                {user.profileImageUrl ? (
                                    <img
                                        className="w-11 h-11 rounded-full shadow-black shadow-md"
                                        src={user.profileImageUrl}
                                        alt=""
                                    />
                                ) : (
                                    <div className="h-11 w-11 bg-blue-950 text-white rounded-full flex items-center justify-center font-semibold">
                                        {user.fullname.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="flex flex-col truncate">
                                    <span className="font-semibold">{user.fullname}</span>
                                    <span className="text-gray-400">{user.email}</span>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li className="shadow-sm shadow-black w-full bg-gray-800 rounded-box py-1">
                        <Link to={'/s'} className="text-green-500 font-semibold">Edit Profile</Link>
                    </li>
                    {user.role === "admin" ? (
                        <li className="shadow-sm shadow-black w-full bg-gray-800 rounded-box py-1">
                            <Link to={'/edit-profile'} className="text-orange-400 font-semibold">My Courses</Link>
                        </li>
                    ) : (
                        <li className="shadow-sm shadow-black w-full bg-gray-800 rounded-box py-1">
                            <Link to={'/edit-profile'} className="text-orange-400 font-semibold">Enrollments</Link>
                        </li>
                    )}
                    <li onClick={handleLogout} className="shadow-sm shadow-black w-full bg-gray-800 rounded-box py-1">
                        <a className={loading ? "text-red-300 font-semibold" : "text-red-500 font-semibold"}>Logout</a>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default ProfileDropdown
import { useState } from "react";
import { Link } from "react-router-dom"
import { dashboardSidebarMenuInstructor, dashboardSidebarMenuUser } from "../../constants/dashboardSidebarMenu"
import { useAuthUser } from "../../hooks/useAuthUser"
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useLogoutUser } from "../../hooks/useLogoutUser";

const Sidebar = ({ isSidebarActive }) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const { mutate: logout, isPending } = useLogoutUser();
    const user = useAuthUser();

    return (
        <div className={`md:z-50 z-30 fixed top-0 left-0 md:translate-x-0 h-screen bg-bg-primary ${isSidebarActive ? "w-[12rem] md:w-[13rem] lg:w-[16rem]" : "-translate-x-full w-[5rem] md:w-[6rem] lg:w-[6rem]"} container border-r border-gray-400 border-opacity-50 transition-all ease-in-out duration-300`}>
            <div className="flex flex-col justify-between h-screen py-6">
                <div className="flex flex-col items-center gap-20">
                    <div>
                        <Link to='/' className="hidden cursor-pointer md:block">
                            <h1 className={`${isSidebarActive ? "md:text-4xl" : "md:text-xl"} text-3xl font-bold bg-[linear-gradient(180deg,_#3e75f3_50%,_#0b3db2_120%)] bg-clip-text text-transparent transition-all ease-in-out duration-200`}>Courso</h1>
                        </Link>
                    </div>

                    {/* menu */}
                    <div className="flex flex-col gap-16">
                        {(user.role === "user" ? dashboardSidebarMenuUser : dashboardSidebarMenuInstructor).map((menu, index) => (
                            <Link to={menu.path} key={index} className="flex items-center justify-start gap-3 transition-all duration-300 ease-in-out">
                                <menu.icon />
                                {isSidebarActive && <span>{menu.name}</span>}
                            </Link>
                        ))}
                    </div>
                </div>

                <div>
                    <div onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className='flex items-center justify-center gap-2 px-2 py-2 overflow-hidden text-lg transition-all duration-300 ease-in-out bg-gray-900 rounded-md cursor-pointer'>
                        {user.profileImageUrl ? (
                            <img
                                className="object-cover h-10 rounded-full min-w-10"
                                src={user.profileImageUrl}
                                alt="User Profile Image"
                            />
                        ) : (
                            <span className='flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-red-600 rounded-full'>
                                {user.fullname?.charAt(0).toUpperCase()}
                            </span>)}
                        {isSidebarActive && (
                            <div className="flex flex-col truncate transition-all duration-300 ease-in-out">
                                <span className="items-center justify-between hidden text-sm transition-all duration-300 ease-in-out lg:text-base md:flex">{user.fullname}</span>
                                <span className="hidden text-xs text-gray-400 transition-all duration-300 ease-in-out md:block lg:text-sm">{user.email}</span>
                            </div>
                        )}
                        {isSidebarActive && (
                            <button className={`hidden md:block`}>
                                <ChevronsUpDown />
                            </button>
                        )}
                    </div>
                    <button disabled={isPending} onClick={() => logout()} className='flex items-center justify-center w-full gap-2 px-4 py-2 text-lg text-white transition-all duration-300 ease-in bg-red-700 rounded-bl-md rounded-br-md lex i -bottom-16 hover:bg-red-500 md:hidden'><LogOut size={20} /> Logout</button>
                </div>

                {isProfileDropdownOpen && (
                    <div className="absolute hidden w-full bottom-12 xl:-right-64 lg:-right-60 -right-[13rem] md:block">
                        <div onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className='flex items-center gap-3 px-4 py-2 overflow-hidden text-lg transition-all duration-300 ease-in-out bg-gray-900 rounded-md cursor-pointer'>
                            {user.profileImageUrl ? (
                                <img
                                    className="object-cover w-10 h-10 rounded-full"
                                    src={user.profileImageUrl}
                                    alt="User Profile Image"
                                />
                            ) : (
                                <span className='flex items-center justify-center w-10 h-10 text-2xl font-bold text-white bg-red-600 rounded-full'>
                                    {user.fullname?.charAt(0).toUpperCase()}
                                </span>)}
                            <div className="flex flex-col truncate transition-all duration-300 ease-in-out">
                                <span className="flex items-center justify-between text-sm transition-all duration-300 ease-in-out lg:text-base">{user.fullname}</span>
                                <span className="text-xs text-gray-400 transition-all duration-300 ease-in-out lg:text-sm">{user.email}</span>
                            </div>
                        </div>

                        <button disabled={isPending} onClick={() => logout()} className='flex items-center justify-center w-full gap-2 px-4 py-2 text-lg text-white transition-all duration-200 ease-in bg-red-700 rounded-bl-md rounded-br-md lex i -bottom-16 hover:bg-red-500'><LogOut size={20} /> Logout</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
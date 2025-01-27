import { GraduationCap, PanelLeft, PanelRight } from "lucide-react"
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom"
import { UserDashboardMenu } from "../../data/UserDashboardMenuItems";
import { InstructorDashboardMenu } from "../../data/AdminDashboardMenuItems";
import { useUserStore } from "../../stores/useUserStore";

const UserDashboard = () => {
    const location = useLocation();
    const { user } = useUserStore();
    const navigators = location.pathname.split('/').filter(item => item !== '');
    const [isSidebarActive, setIsSidebarActive] = useState(true);

    const { logout, loading } = useUserStore();


    const toggleSidebar = () => {
        setIsSidebarActive((prev) => !prev);
    }

    function handleLogout() {
        logout();
    }

    return (
        <div className="w-full min-h-screen flex">
            {
                // sidebar
            }
            <section className={`fixed h-full pt-4 py-2 px-2 bg-gray-800 transition-all ease-in ${isSidebarActive ? "min-w-56" : "max-w-16"}`}>
                <div className="flex flex-col justify-between min-h-full">
                    <div className="flex flex-col gap-6 items-center">
                        <div>
                            {isSidebarActive ? (
                                <div className="relative">
                                    <Link to={'/'} className="relative">
                                        <GraduationCap className="absolute -right-1 text-blue-600 rotate-6" size={26} />
                                        <span className="text-3xl font-bold text-gray-100 z-12">Courso</span>
                                    </Link>
                                </div>
                            ) : (
                                <Link to={'/'}>
                                    <GraduationCap className="text-blue-600 rotate-6" size={30} />
                                </Link>
                            )}
                        </div>

                        <div className="w-full">
                            <div className={`flex flex-col gap-2 px-2 ${!isSidebarActive && "items-center"}`}>
                                {user.role === "user" ? (
                                    UserDashboardMenu.map((item, index) => {
                                        let ItemComponent = item.icon;
                                        return (
                                            <Link key={index} to={item.url} className="flex gap-2 items-center py-2 px-2 rounded-md hover:bg-gray-900 transition-all ease">
                                                <ItemComponent size={"22"} />
                                                {isSidebarActive && (
                                                    <span className="text-md font-semibold">{item.name}</span>
                                                )}
                                            </Link>
                                        )
                                    })
                                ) : (
                                    InstructorDashboardMenu.map((item, index) => {
                                        let ItemComponent = item.icon;
                                        return (
                                            <Link key={index} to={item.url} className="flex gap-2 items-center py-2 px-2 rounded-md hover:bg-gray-900 transition-all ease">
                                                <ItemComponent size={"22"} />
                                                {isSidebarActive && (
                                                    <span className="text-md font-semibold">{item.name}</span>
                                                )}
                                            </Link>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t pt-5 border-gray-700">
                        <div className="flex gap-2 items-center">
                            <div className={`${!isSidebarActive ? "flex justify-center min-w-full pb-2" : ""}`}>
                                {user.profileImageUrl ? (
                                    <Link to={'/s/view-profile'}>
                                        <img
                                            className="max-h-10 max-w-10 rounded-full object-cover transition-all ease shadow-xl"
                                            src={user.profileImageUrl}
                                            alt={user.fullname}
                                        />
                                    </Link>
                                ) : (
                                    <div className="h-10 w-10 bg-blue-950 text-white rounded-full flex items-center justify-center font-semibold hover:brightness-75 transition-all ease">
                                        {user.fullname.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-0 truncate">
                                <span>{user.fullname}</span>
                                <span className="text-sm text-gray-400">{user?.headline}</span>
                            </div>
                        </div>
                        {isSidebarActive && (
                            <button disabled={loading} onClick={handleLogout} className="py-2 px-4 bg-red-600 rounded-sm hover:bg-red-800 transition-all ease">Logout</button>
                        )}
                    </div>
                </div>
            </section>


            <section className={`transition-all z-20 ease-in ${isSidebarActive ? "ml-56" : "ml-16"
                } w-full`}>
                {
                    // navBar
                }
                <nav className="fixed w-full z-10 flex items-center gap-4 py-3 px-6 border-b border-blue-950 backdrop-blur-sm">
                    <div onClick={toggleSidebar} className="p-1 hover:bg-gray-800 rounded-lg transition-all ease cursor-pointer">
                        {isSidebarActive ? <PanelRight /> : <PanelLeft />}
                    </div>
                    <div className="text-lg flex gap-2">
                        {navigators.length > 0 && (
                            navigators.map((item, index) => {
                                return (
                                    <div key={index} className="flex items-center gap-2">
                                        <span>{index !== 0 && '>'}</span>
                                        <Link className={`hover:text-blue-500 transition-all ease ${index === 0 && "text-gray-400"}`}>
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </Link>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </nav>

                <main>
                    <Outlet />
                </main>
            </section>
        </div>
    )
}

export default UserDashboard
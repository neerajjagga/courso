import Sidebar from "../../components/dashboard/Sidebar"
import { Outlet } from "react-router-dom"

import DashboardNavbar from "../../components/dashboard/DashboardNavbar"
import { useState } from "react"

const Dashboard = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(true);

  return (
    <div className="relative w-full min-h-screen overflow-hidden ">
      <div className="flex">
        <Sidebar
          isSidebarActive={isSidebarActive}
          setIsSidebarActive={setIsSidebarActive}
        />

        <main className="w-full">
          <DashboardNavbar
            isSidebarActive={isSidebarActive}
            setIsSidebarActive={setIsSidebarActive}
          />
          <div className={`${isSidebarActive ? "md:pl-[13rem] lg:pl-[16rem]" : "md:pl-[5rem] lg:pl-[6rem]"} w-full h-full overflow-y-auto transition-all duration-300 ease md:mt-16 mt-14 py-6`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
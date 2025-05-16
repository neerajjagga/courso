import { PanelLeftOpen, PanelLeftClose } from 'lucide-react'
import React from 'react';
import { useLocation } from 'react-router-dom'

interface PropType {
    isSidebarActive: boolean;
    setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNavbar = ({ isSidebarActive, setIsSidebarActive }: PropType) => {
    const location = useLocation();
    const locationArray = location.pathname.split('/');

    return (
        <div className={`z-30 fixed backdrop-blur-sm w-full border-b border-gray-400 border-opacity-50 ${isSidebarActive ? "md:pl-[13rem] lg:pl-[16rem]" : "md:pl-[5rem] lg:pl-[6rem]"} transition-all duration-300 ease md:h-16 h-13`}>
            <div className="flex items-center gap-2 py-[1rem] md:px-8 px-4 cursor-pointer">
                <div>
                    {isSidebarActive ? (
                        <PanelLeftClose className='' onClick={() => setIsSidebarActive(!isSidebarActive)} size={26} />
                    ) : (
                        <PanelLeftOpen className='' onClick={() => setIsSidebarActive(!isSidebarActive)} size={26} />
                    )}
                </div>

                <div className="flex gap-2 md:gap-4">
                    {locationArray.map((location, index) => (
                        <div key={index} className="flex items-center gap-1 text-sm text-gray-300 truncate md:gap-4 md:text-lg">
                            <span>{location.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                            }</span>
                            {index !== locationArray.length - 1 && <span>|</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashboardNavbar
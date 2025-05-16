import React from 'react';
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';

interface PropType {
  children: React.ReactNode
}

const Layout = ({ children }: PropType) => {
  const location = useLocation();
  const hideNavbarRoutes = ['/dashboard', '/instructor/course', '/learn'];
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-base font-satoshi">
      {!shouldHideNavbar && <Navbar />}
      <main className={` ${!shouldHideNavbar && "container"} `}>
        {children}
      </main>
    </div>
  )
}

export default Layout
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const hideNavbarRoutes = '/dashboard';
  const shouldHideNavbar = location.pathname.startsWith(hideNavbarRoutes);

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
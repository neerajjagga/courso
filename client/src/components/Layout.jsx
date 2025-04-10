import Navbar from './Navbar'
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  console.log(location);


  const hideNavbarRoutes = ['/dashboard', '/instructor/course'];
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
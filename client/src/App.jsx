import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import IndexPage from './pages/IndexPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from "./pages/LoginPage";
import ContactUsPage from "./pages/ContactUsPage";
import CoursesPage from "./pages/CoursesPage";
import AboutPage from "./pages/AboutPage";
import Loader from "./components/Loader";
import { Toaster } from 'react-hot-toast';
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import Settings from "./pages/Settings";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import ActiveCourses from "./pages/Dashboard/ActiveCourses";
import Bookmarks from "./pages/Dashboard/Bookmarks";
import ViewPublicProfile from "./components/ViewPublicProfile";
import EditProfile from "./components/EditProfile";
import EditPhoto from "./components/EditPhoto";
import CloseAccount from "./components/CloseAccount";
import BecomeTeacherPage from "./pages/BecomeTeacherPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {

  const { user, checkAuth, checkingAuthLoader } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuthLoader) {
    return <Loader />
  }

  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden pb-10">

      <div className='relative z-50'>
        {!isDashboardRoute && <Navbar />}
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/signup" element={user ? <Navigate to={'/'} /> : <SignUpPage />} />
          <Route path="/login" element={user ? <Navigate to={'/'} /> : <LoginPage />} />
          <Route path="/verify-email" element={(user?.isEmailVerified || !user) ? <Navigate to={'/'} /> : <VerifyEmailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/s" element={user ? <Settings /> : <Navigate to={'/'} />}>
            <Route path="view-profile" element={<ViewPublicProfile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="edit-photo" element={<EditPhoto />} />
            <Route path="close-account" element={<CloseAccount />} />
          </Route>
          <Route path="/dashboard" element={user ? <UserDashboard /> : <Navigate to={'/'} />}>
            <Route path="active-courses" element={<ActiveCourses />} />
            <Route path="bookmarks" element={<Bookmarks />} />
          </Route>
          <Route path="/become-instructor" element={user ? <Navigate to={'/'} /> : <BecomeTeacherPage />} />
        </Routes>
      </div>

      <Toaster position="bottom-right" toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }}
      />
    </div>
  )
}

export default App

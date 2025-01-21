import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {

  const { user, checkAuth, checkingAuthLoader } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if(checkingAuthLoader) {
    return <Loader />
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden pb-10">

      <div className='relative z-50 pt-20 flex flex-col items-center'>
        <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/signup" element={user ? <Navigate to={'/'} /> : <SignUpPage />} />
          <Route path="/login" element={user ? <Navigate to={'/'} /> : <LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/s" element={user ? <Settings /> : <Navigate to={'/'} />} />
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

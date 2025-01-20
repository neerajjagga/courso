import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import IndexPage from './pages/IndexPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from "./pages/LoginPage";
import { Toaster } from 'react-hot-toast';
import { useUserStore } from "./stores/useUserStore"; 
import { useEffect } from "react";

function App() {

  const { user, checkAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden pb-10">

      <div className='relative z-50 pt-20 flex flex-col items-center'>
        <Navbar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/signup" element={user ? <Navigate to={'/'} /> : <SignUpPage />} />
          <Route path="/login" element={user ? <Navigate to={'/'} /> : <LoginPage />} />
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

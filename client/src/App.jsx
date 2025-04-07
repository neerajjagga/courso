import Layout from "./components/Layout"
import { Routes, Route, Navigate } from 'react-router-dom'
import CustomLoader from "./components/CustomLoader";

import Index from "./pages/Index"
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import InstructorSignUp from "./pages/auth/InstructorSignUp";

import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInst } from "./lib/axios";

const App = () => {

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axiosInst.get('/user');
        return res.data.user
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
          return null;
        }
        toast.error("Something went wrong");
      }
    }
  });

  if (isLoading) return <CustomLoader />

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to='/' />} />
        <Route path="/instructor-signup" element={!user ? <InstructorSignUp /> : <Navigate to='/' />} />
      </Routes>

      <Toaster position="bottom-right" toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }}
      />
    </Layout>
  )
}

export default App
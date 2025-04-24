import Layout from "./components/Layout"
import { Routes, Route, Navigate } from 'react-router-dom'
import CustomLoader from "./components/CustomLoader";

import Index from "./pages/Index"
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import InstructorSignUp from "./pages/auth/InstructorSignUp";

import Dashboard from "./pages/dashboard/Dashboard";
import AllCourses from "./pages/dashboard/AllCourses";
import Enrollments from "./pages/dashboard/Enrollments";
import History from "./pages/dashboard/History";
import Settings from "./pages/dashboard/Settings";
import InstructorCourses from "./pages/dashboard/InstructorCourses";

import NewCourseBoarding from './pages/course/new/NewCourseBoarding';
import StepOne from "./pages/course/new/steps/StepOne";
import StepTwo from "./pages/course/new/steps/StepTwo";
import StepThree from "./pages/course/new/steps/StepThree";
import StepFour from "./pages/course/new/steps/StepFour";
import StepFive from "./pages/course/new/steps/StepFive";

import ManageCourse from "./pages/course/manage/ManageCourse";
import Curriculum from "./pages/course/manage/Curriculum";
import CourseLandingPage from "./pages/course/manage/CourseLandingPage";

import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInst } from "./lib/axios";
import SingleCourse from "./pages/dashboard/SingleCourse";

import LearnCourse from "./pages/course/learn/LearnCourse";

const App = () => {

  const { data: user, isLoading } = useQuery({
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

        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/' />} >

          {/* instructor route */}
          <Route path="instructor/courses" element={user ? <InstructorCourses /> : <Navigate to='/' />} />

          <Route path="courses" element={user ? <AllCourses /> : <Navigate to='/' />} />
          <Route path="enrollments" element={user ? <Enrollments /> : <Navigate to='/' />} />
          <Route path="settings" element={user ? <Settings /> : <Navigate to='/' />} />
          <Route path="history" element={user ? <History /> : <Navigate to='/' />} />
          <Route path="course/:titleSlug" element={user ? <SingleCourse /> : <Navigate to='/' />} />
        </Route>

        <Route path="/instructor/course/create" element={(user && user.role === "instructor") ? <NewCourseBoarding /> : <Navigate to='/' />}>
          <Route path="1" element={(user && user.role === "instructor") ? <StepOne /> : <Navigate to='/' />} />
          <Route path="2" element={(user && user.role === "instructor") ? <StepTwo /> : <Navigate to='/' />} />
          <Route path="3" element={(user && user.role === "instructor") ? <StepThree /> : <Navigate to='/' />} />
          <Route path="4" element={(user && user.role === "instructor") ? <StepFour /> : <Navigate to='/' />} />
          <Route path="5" element={(user && user.role === "instructor") ? <StepFive /> : <Navigate to='/' />} />
        </Route>

        <Route path="/instructor/course/:titleSlug/manage" element={(user && user.role === "instructor") ? <ManageCourse /> : <Navigate to='/' />}>
          <Route
            index
            element={<Navigate to="basics" replace />}
          />

          <Route path="curriculum" element={(user && user.role === "instructor") ? <Curriculum /> : <Navigate to='/' />} />
          <Route path="basics" element={(user && user.role === "instructor") ? <CourseLandingPage /> : <Navigate to='/' />} />
        </Route>

        <Route path="/learn/:titleSlug" element={user ? <LearnCourse /> : <Navigate to='/' />} />
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
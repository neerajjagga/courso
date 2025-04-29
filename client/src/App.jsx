import Layout from "./components/Layout"
import { Routes, Route, Navigate } from 'react-router-dom'
import CustomLoader from "./components/common/CustomLoader";
import { useFetchAuthUser } from "./hooks/user/useFetchAuthUser";

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
import Performance from "./pages/dashboard/Performance";

import NewCourseBoarding from './pages/course/new/NewCourseBoarding';
import StepOne from "./pages/course/new/steps/StepOne";
import StepTwo from "./pages/course/new/steps/StepTwo";
import StepThree from "./pages/course/new/steps/StepThree";
import StepFour from "./pages/course/new/steps/StepFour";
import StepFive from "./pages/course/new/steps/StepFive";

import ManageCourse from "./pages/course/manage/ManageCourse";
import Curriculum from "./pages/course/manage/Curriculum";
import CourseLandingPage from "./pages/course/manage/CourseLandingPage";

import { Toaster } from "react-hot-toast";
import SingleCourse from "./pages/dashboard/SingleCourse";

import LearnCourse from "./pages/course/learn/LearnCourse";
import PaymentHistory from "./pages/dashboard/PaymentHistory";

import ProtectedRoute from './components/routes/ProtectedRoute';

const App = () => {
  const { data: user, isLoading } = useFetchAuthUser();

  if (isLoading) return <CustomLoader />

  return (
    <Layout>
      <Routes>

        <Route path="/" element={<Index />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to='/' />} />
        <Route path="/instructor-signup" element={!user ? <InstructorSignUp /> : <Navigate to='/' />} />

        <Route element={<ProtectedRoute isAllowed={!!user} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="courses" element={<AllCourses />} />
            <Route path="enrollments" element={<Enrollments />} />
            <Route path="settings" element={<Settings />} />
            <Route path="history" element={<History />} />
            <Route path="course/:titleSlug" element={<SingleCourse />} />
            <Route path="payment-history" element={<PaymentHistory />} />
            <Route path="performance" element={<Performance />} />
            <Route path="instructor/courses" element={<InstructorCourses />} />
          </Route>

          <Route path="/learn/:titleSlug" element={<LearnCourse />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={user?.role === 'instructor'} />}>
          <Route path="/instructor/course/create" element={<NewCourseBoarding />}>
            <Route path="1" element={<StepOne />} />
            <Route path="2" element={<StepTwo />} />
            <Route path="3" element={<StepThree />} />
            <Route path="4" element={<StepFour />} />
            <Route path="5" element={<StepFive />} />
          </Route>

          <Route path="/instructor/course/:titleSlug/manage" element={<ManageCourse />}>
            <Route index element={<Navigate to="basics" replace />} />
            <Route path="curriculum" element={<Curriculum />} />
            <Route path="basics" element={<CourseLandingPage />} />
          </Route>
        </Route>

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
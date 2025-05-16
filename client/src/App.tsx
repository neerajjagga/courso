import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from "./components/Layout"
import ProtectedRoute from './components/routes/ProtectedRoute';
import CustomLoader from "./components/common/CustomLoader";
import { useUserStore } from "./store/useUserStore";

import Index from "./pages/Index"
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import InstructorSignUp from "./pages/auth/InstructorSignUp";

const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const AllCourses = lazy(() => import("./pages/dashboard/AllCourses"));
const Enrollments = lazy(() => import("./pages/dashboard/Enrollments"));
const History = lazy(() => import("./pages/dashboard/History"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const InstructorCourses = lazy(() => import("./pages/dashboard/InstructorCourses"));
const Performance = lazy(() => import("./pages/dashboard/Performance"));

const NewCourseBoarding = lazy(() => import("./pages/course/new/NewCourseBoarding"));
const StepOne = lazy(() => import("./pages/course/new/steps/StepOne"));
const StepTwo = lazy(() => import("./pages/course/new/steps/StepTwo"));
const StepThree = lazy(() => import("./pages/course/new/steps/StepThree"));
const StepFour = lazy(() => import("./pages/course/new/steps/StepFour"));
const StepFive = lazy(() => import("./pages/course/new/steps/StepFive"));

const ManageCourse = lazy(() => import("./pages/course/manage/ManageCourse"));
const Curriculum = lazy(() => import("./pages/course/manage/Curriculum"));
const CourseLandingPage = lazy(() => import("./pages/course/manage/CourseLandingPage"));

const SingleCourse = lazy(() => import("./pages/dashboard/SingleCourse"));
const LearnCourse = lazy(() => import("./pages/course/learn/LearnCourse"));
const PaymentHistory = lazy(() => import("./pages/dashboard/PaymentHistory"));

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) return <CustomLoader />

  return (
    <Layout>
      <Suspense fallback={<CustomLoader />}>
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
      </Suspense>

      <Toaster position="bottom-right" toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontSize: "16px"
        },
      }}
      />
    </Layout >
  )
}

export default App
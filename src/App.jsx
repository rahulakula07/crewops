import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './components/Authentication/Login/Login';
import Signup from './components/Authentication/SignUp/Signup';
import LandingPage from './components/Launchpage/Launchpage';
import ProtectedRoute from './components/Protectedroute/Protectedroute';
import Spinner from './components/spinner/Spinner';
import AuthRedirect from './components/Protectedroute/AuthorRerouting';
import { useAuth } from './components/Authentication/Authprovider/Authprovide';

// Lazy load the components
const AdminDashboard = React.lazy(() => import('./components/Dashboard/mangerDashboard/ManagerDashboard'));
const Departments = React.lazy(() => import('./components/Dashboard/mangerDashboard/pages/Departments'));
const Employer = React.lazy(() => import('./components/Dashboard/mangerDashboard/pages/employer'));
const UserDashboard = React.lazy(() => import('./components/Dashboard/employerDasboard/EmployerDashboard'));
const UserTasks = React.lazy(() => import('./components/Dashboard/employerDasboard/Usertask'));
const AdminLayout = React.lazy(() => import('./components/layouts/Layout'));
const UserLayout = React.lazy(() => import('./components/layouts/Userlayout'));
const Leave = React.lazy(() => import('./components/Dashboard/mangerDashboard/pages/Leave'));


const App = () => {
  const { loading } = useAuth();

  if (loading) return <Spinner />;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/Login" element={<AuthRedirect><Login /></AuthRedirect>} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
            <Route path="/admins" element={<AdminLayout />}>
              <Route path="AdminDashboard" element={<AdminDashboard />} />
              <Route path="Departments" element={<Departments />} />
              <Route path="Employer" element={<Employer />} />
              <Route path="Leave" element={<Leave />} />
              <Route path="Signup" element={<Signup />} />
            </Route>
          </Route>

          {/* Employer Routes */}
          <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
            <Route path="/user" element={<UserLayout />}>
              <Route path="UserDashboard" element={<UserDashboard />} />
              <Route path="Usertasks" element={<UserTasks />} />
            </Route>
          </Route>

          {/* Catch-all */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </Suspense>
    </>
  );
};

export default App;




// import React, { Suspense } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Login from './components/Authentication/Login/Login';
// import Signup from './components/Authentication/SignUp/Signup';
// import LandingPage from './components/Launchpage/Launchpage';
// import ProtectedRoute from './components/Protectedroute/Protectedroute';
// import Spinner from './components/spinner/Spinner';
// import AuthRedirect from './components/Protectedroute/AuthorRerouting';

// // Lazy load the components
// const AdminDashboard = React.lazy(() => import('./components/Dashboard/mangerDashboard/ManagerDashboard'));
// const Departments = React.lazy(() => import('./components/Dashboard/mangerDashboard/pages/Departments'));
// const Employer = React.lazy(() => import('./components/Dashboard/mangerDashboard/pages/employer'));
// const UserDashboard = React.lazy(() => import('./components/Dashboard/employerDasboard/EmployerDashboard'));
// const UserTasks = React.lazy(() => import('./components/Dashboard/employerDasboard/Usertask'));
// const AdminLayout = React.lazy(() => import('./components/layouts/Layout'));
// const UserLayout = React.lazy(() => import('./components/layouts/Userlayout'));
// const Leave=React.lazy(()=>import('./components/Dashboard/mangerDashboard/pages/Leave'))

// const App = () => {
//   return (
//     <div>
//       <Suspense fallback={<Spinner />}>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/Signup" element={<Signup />} />
//           {/* <Route path="/Login" element={<Login />} /> */}
//           <Route path="/Login" element={
//             <AuthRedirect >
//               <Login />
//             </AuthRedirect>
//           } />


//           {/* Admin Only */}
//           <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
//             <Route path="/admins" element={<AdminLayout />}>
//               <Route path="/admins/AdminDashboard" element={<AdminDashboard />} />
//               <Route path="/admins/Departments" element={<Departments />} />
//               <Route path="/admins/Employer" element={<Employer />} />
//               <Route path='/admins/Leave' element={<Leave/>}/>
//             </Route>
//           </Route>

//           {/* Employer Only */}
//           <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
//             <Route path="/user" element={<UserLayout />}>
//               <Route path="/user/UserDashboard" element={<UserDashboard />} />
//               <Route path="/user/Usertasks" element={<UserTasks />} />
//             </Route>
//           </Route>
//         </Routes>
//       </Suspense>
//     </div>
//   );
// };

// export default App;


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
  return (
    <>
      {/* GLOBAL TOAST CONTAINER */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          } />

          {/* Admin Only */}
          <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
            <Route path="/admins" element={<AdminLayout />}>
              <Route path="/admins/AdminDashboard" element={<AdminDashboard />} />
              <Route path="/admins/Departments" element={<Departments />} />
              <Route path="/admins/Employer" element={<Employer />} />
              <Route path="/admins/Leave" element={<Leave />} />
            </Route>
          </Route>

          {/* Employer Only */}
          <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
            <Route path="/user" element={<UserLayout />}>
              <Route path="/user/UserDashboard" element={<UserDashboard />} />
              <Route path="/user/Usertasks" element={<UserTasks />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;




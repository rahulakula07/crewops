import React from 'react'
import Login from './components/Authentication/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Authentication/SignUp/Signup'
import LandingPage from './components/Launchpage/Launchpage'
import Employer from './components/Dashboard/mangerDashboard/pages/employer'
import AdminDashboard from './components/Dashboard/mangerDashboard/ManagerDashboard'
import Departments from './components/Dashboard/mangerDashboard/pages/Departments'
import AdminLayout from './components/layouts/Layout'
import UserLayout from './components/layouts/Userlayout'
import UserTasks from './components/Dashboard/employerDasboard/Usertask'
import UserDashboard from './components/Dashboard/employerDasboard/EmployerDashboard'
import ProtectedRoute from './components/Protectedroute/Protectedroute'
// import AuthRedirect from './components/Protectedroute/AuthorRerouting'
const App = () => {
  return (
    <div>
    
{/* <Routes>


<Route path="/admins" element={<AdminLayout />}>
  <Route path="/admins/AdminDashboard" element={<AdminDashboard />} />
  <Route path="/admins/Departments" element={<Departments />} />
  <Route path="/admins/Employer" element={<Employer />} />
</Route>


 <Route path="/user" element={<UserLayout />}>
    <Route path="/user/UserDashboard" element={<UserDashboard />} />
    <Route path="/user/Usertasks" element={<UserTasks />} />
  </Route>


<Route path="/Signup" element={<Signup />} />
<Route path="/Login" element={<Login />} />
<Route path='/' element={<LandingPage />} />

</Routes> */}
<Routes>
  {/* Public Routes */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/Signup" element={<Signup />} />
  <Route
    path="/Login"
    element={
      // <AuthRedirect>
        <Login />
      // </AuthRedirect>
    }
  />

  {/* Admin Only */}
  <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
    <Route path="/admins" element={<AdminLayout />}>
      <Route path="/admins/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/admins/Departments" element={<Departments />} />
      <Route path="Employer" element={<Employer />} />
    </Route>
  </Route>

  {/* Employer Only */}
  <Route element={<ProtectedRoute allowedRoles={["employer"]} />}>
    <Route path="/user" element={<UserLayout />}>
      <Route path="UserDashboard" element={<UserDashboard />} />
      <Route path="Usertasks" element={<UserTasks />} />
    </Route>
  </Route>
</Routes>

 </div>
  )
}

export default App

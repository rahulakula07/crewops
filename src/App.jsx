import React from 'react'
import Login from './components/Authentication/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import CredentialsSignInPage from "./components/Authentication/Login/Login"
import Signup from './components/Authentication/SignUp/Signup'
import LandingPage from './components/Launchpage/Launchpage'
import Footer from './components/Footer/Footer'
import Employer from './components/Dashboard/mangerDashboard/pages/employer'
import AdminDashboard from './components/Dashboard/mangerDashboard/ManagerDashboard'
import { Layout } from './components/Layout'
import Departments from './components/Dashboard/mangerDashboard/pages/Departments'





const App = () => {
  return (
    <div>
      {/* <Navbar/> */}
      {/* <Layout/> */}
      <Routes>
      {/* <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Login' element={<Login/>}/> */}
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage />}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
          <Route path='/Departments' element={<Departments/>}/>
          <Route path='/employer' element={<Employer />}/>
        </Route>
      </Routes>


    </div>
  )
}

export default App

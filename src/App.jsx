import React from 'react'
import Login from './components/Authentication/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import CredentialsSignInPage from "./components/Authentication/Login/Login"
import Signup from './components/Authentication/SignUp/Signup'
import LandingPage from './components/Launchpage/Launchpage'
import Footer from './components/Footer/Footer'
import AdminDashboard from './components/Dashboard/ManagerDashboard'




const App = () => {
  return (
    <div>
      <Navbar/>
      {/* <LandingPage /> */}
      
      {/* <CredentialsSignInPage/> */}
     <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Login' element={<CredentialsSignInPage/>}></Route>
      <Route path='/AdminDasboard' element={<AdminDashboard/>}></Route>
      <Route path='/Navbar' element={<Navbar/>}></Route>
     </Routes>
     <Footer/>
      
    </div>
  )
}

export default App

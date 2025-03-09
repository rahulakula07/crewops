import React from 'react'
// import Signup from './components/SignUp/Signup'
import Login from './components/Authentication/Login/Login'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Navbar/Navbar'
import CredentialsSignInPage from "./components/Authentication/Login/Login"
import Signup from './components/Authentication/SignUp/Signup'




const App = () => {
  return (
    <div>
      <Navbar/>
      {/* <CredentialsSignInPage/> */}
     <Routes>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Login' element={<CredentialsSignInPage/>}></Route>
      <Route path='/Navbar' element={<Navbar/>}></Route>
     </Routes>
      
    </div>
  )
}

export default App

import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate,Link } from 'react-router-dom'


function Navbar() {
    const navigate=useNavigate()
  return (
    <div className="landing-page">
    {/* Navbar */}
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="#">HRbes</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#">Demo</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Features</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Free Figma File</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Usability</a></li>
          </ul>
          {/* <Link to="/Signup"> <button className=" buy-now"  onClick={()=>navigate("/Signup")}>Sign up</button> </Link> */}
          <Link to="/Signup" className="buy-now">Sign up</Link>
          <Link to="/Login" className="buy-now">Login</Link>
          {/* <button className=" buy-now" onClick={()=>navigate("Login")}>Login</button> */}
        </div>
      </div>
    </nav>
    </div>
  )
}
                                                    
export default Navbar



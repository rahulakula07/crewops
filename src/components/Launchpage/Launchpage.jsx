import React,{} from "react";
import "./Launchpage.css";
import { href, useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';
import Footer from "../Footer/Footer";
import Navbar from "../../Navbar/Navbar";




const LandingPage = () => {
    const navigate=useNavigate()
  return (
    <div>
      <Navbar/>
    <div className="landing-page1">
      
      {/* Hero Section */}
      <header className="hero-section">
        <div className="container text-center">
          <h1>Create a Stunning HR Management Website in Webflow with HRbes</h1>
          <p>Experience a modern Webflow template for HR management software, offering features to build business websites, including Recruitment, Payroll, Employee Management, and more!</p>
          <button className=" explore-demo" onClick={()=>navigate("/Signup")}>Explore Now</button>
        </div>
      </header>  
    </div>
    <Footer/>
    </div>
  );
};

export default LandingPage;
import React from "react";
import Sidebar from "./Dashboard/mangerDashboard/pages/sidebar";
// import AdminDashboard from "./Dashboard/mangerDashboard/pages/Dashboard"
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="container-fluid vh-100 d-flex flex-column">
        <div className="row flex-grow-1">
          <aside className="col-lg-2 col-md-3 d-none d-md-block">
            <Sidebar />
          </aside>

          {/* <aside className="d-md-none w-100">
            <Sidebar />
          </aside> */}


          <section className="col-lg-10 col-md-9 p-4 overflow-auto">
            <Outlet />
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
};


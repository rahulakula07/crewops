// import React from "react";
// import { Outlet } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "../../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import UserSidebar from "../Dashboard/employerDasboard/UserSidebar";



// // const drawerWidth = 240;

// const UserLayout = () => {
//   return (
//     <main style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       {/* Navbar */}
//       <Navbar />

//       {/* Content Area */}
//       <div style={{ display: "flex" }}>
//         <UserSidebar />
//         {/* <UserDashboard /> */}
//         <Outlet/>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </main>
//   );
// };

// export default UserLayout;


import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UserSidebar from "../Dashboard/employerDasboard/UserSidebar";
import { useTheme, useMediaQuery } from "@mui/material";

const UserLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <main style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Content Area */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        {!isMobile && (
          <div style={{ height: "100%", flexShrink: 0 }}>
            <UserSidebar />
          </div>
        )}

        {/* Main Content */}
        <div style={{ flexGrow: 1, overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default UserLayout;


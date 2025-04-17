import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UserSidebar from "../Dashboard/employerDasboard/UserSidebar";
import { useTheme, useMediaQuery, Box, Skeleton } from "@mui/material";

// Layout constants
const drawerWidth = 240;
const navbarHeight = 64;
const footerHeight = 56;

const UserLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <Box sx={{ height: `${navbarHeight}px`, flexShrink: 0 }}>
        <Navbar />
      </Box>

      {/* Sidebar + Main Content */}
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        {!isMobile && (
          <Box
            component="aside"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              display: { xs: "none", md: "block" },
              borderRight: "1px solid #e0e0e0",
              bgcolor: "background.paper",
              height: `calc(100vh - ${navbarHeight + footerHeight}px)`,
              overflowY: "auto",
              overflowX: "hidden",
              boxSizing: "border-box",
            }}
          >
            <UserSidebar />
          </Box>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            height: `calc(100vh - ${navbarHeight + footerHeight}px)`,
            bgcolor: "background.default",
          }}
        >
          <Suspense
            fallback={
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ height: `${footerHeight}px`, flexShrink: 0 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default UserLayout;

import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../Navbar/Navbar";
import Footer from "../Footer/Footer";
import UserSidebar from "../Dashboard/employerDasboard/UserSidebar";
import { useTheme, useMediaQuery, Box, Skeleton } from "@mui/material";

const UserLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar />

      {/* Content Area */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar */}
        {!isMobile && (
          <Box
            component="aside"
            sx={{
              width: { md: 240, sm: 200 },
              flexShrink: 0,
              display: { xs: "none", md: "block" },
              borderRight: "1px solid #e0e0e0",
              bgcolor: "background.paper",
            }}
          >
            <UserSidebar />
          </Box>
        )}

        {/* Main Content with Skeleton Fallback */}
        <Box
          component="section"
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            width: { xs: "100%", md: `calc(100% - 240px)` },
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
      <Footer />
    </Box>
  );
};

export default UserLayout;

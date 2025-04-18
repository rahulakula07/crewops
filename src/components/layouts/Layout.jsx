import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../Dashboard/mangerDashboard/pages/sidebar";
import Footer from "../Footer/Footer";
import { Box, CssBaseline, Skeleton, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";


const drawerWidth = 240;
const navbarHeight = 64;
const footerHeight = 56;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />

      {/* Navbar */}
      <Box sx={{ height: `${navbarHeight}px`, flexShrink: 0 }}>
        <Navbar />
      </Box>

      {/* Main Layout Section: Sidebar + Content */}
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Sidebar - shown only on medium+ screens */}
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
            <Sidebar />
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

export default AdminLayout;





  
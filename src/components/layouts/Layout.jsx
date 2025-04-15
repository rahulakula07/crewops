import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import Sidebar from "../Dashboard/mangerDashboard/pages/sidebar";
import Footer from "../Footer/Footer";
import { Box, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

const AdminLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Navbar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {/* Sidebar - hidden on mobile */}
        {!isMobile && (
          <Box
            component="aside"
            sx={{
              width: { md: drawerWidth, sm: 200 },
              flexShrink: 0,
              display: { xs: "none", md: "block" },
              borderRight: "1px solid #e0e0e0",
              bgcolor: "background.paper",
            }}
          >
            <Sidebar />
          </Box>
        )}

        {/* Main Content */}
        <Box
          component="section"
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: "auto",
            width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar sx={{ mb: 2 }} />
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout;

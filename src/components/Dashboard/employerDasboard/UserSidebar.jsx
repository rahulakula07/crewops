import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/user/Userdashboard" },
    { text: "My Tasks", icon: <WorkIcon />, path: "/user/Usertasks" },
    // { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          position: "relative",
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        {isLoading
          ? new Array(3).fill(0).map((_, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Skeleton variant="circular" width={30} height={30} />
                </ListItemIcon>
                <ListItemText>
                  <Skeleton variant="text" width={100} />
                </ListItemText>
              </ListItem>
            ))
          : menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem
                  button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    cursor:"pointer",
                    backgroundColor: isActive ? "#7C3AED" : "transparent",
                    color: isActive ? "#fff" : "inherit",
                    borderRadius: "8px", 
                    paddingLeft: isActive ? "20px" : "16px", 
                    paddingRight: "16px", 
                    "&:hover": {
                      backgroundColor: isActive ? "#5B21B6" : "#f0f0f0",
                      borderRadius: "8px", 
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#fff" : "inherit",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
      </List>
    </Drawer>
  );
};

export default Sidebar;

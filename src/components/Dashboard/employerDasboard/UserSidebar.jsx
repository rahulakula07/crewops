import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom"; 

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate(); 

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/user/Userdashboard" },
    { text: "My Tasks", icon: <WorkIcon />, path: "/user/Usertasks" },
    { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
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
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleNavigation(item.path)} 
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

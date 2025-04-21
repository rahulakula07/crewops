import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Skeleton } from '@mui/material';
import { FaThLarge, FaUserTie, FaBuilding, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 1000); 
  }, []);

  const menuItems = [
    { text: 'Dashboard', icon: <FaThLarge />, path: '/admins/AdminDashboard' },
    { text: 'Employees', icon: <FaUserTie />, path: '/admins/employer' },
    { text: 'Departments', icon: <FaBuilding />, path: '/admins/Departments' },
    { text: 'Applied Leaves', icon: <FaCog />, path: '/admins/Leave' },
    { text: 'Add New Employee', icon: <FaSignOutAlt />, path: '/admins/Signup' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          position: 'relative',
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        {isLoading ? (
          // Display Skeleton Loader for each item
          new Array(5).fill(0).map((_, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Skeleton variant="circular" width={30} height={30} />
              </ListItemIcon>
              <ListItemText>
                <Skeleton variant="text" width={100} />
              </ListItemText>
            </ListItem>
          ))
        ) : (
          // Menu items when data is loaded
          menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                button
                key={index}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#7C3AED' : 'transparent',
                  color: isActive ? '#fff' : 'inherit',
                  borderRadius: '8px', 
                  paddingLeft: isActive ? '20px' : '16px', 
                  paddingRight: '16px', 
                  '&:hover': {
                    backgroundColor: isActive ? '#5B21B6' : '#f0f0f0',
                    borderRadius: '8px',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#fff' : 'inherit',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            );
          })
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FaUserCircle } from 'react-icons/fa';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const uid = currentUser.uid;
        const userRef = ref(db, `users/${uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data && data.name) {
            setUserName(data.name);
          } else {
            setUserName(currentUser.email); // fallback
          }
        });
      } else {
        setUserName('');
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleIconClick = () => {
    setShowLogout(!showLogout);
  };

  const theme = useTheme();
  // Mobile and tablet sizes now start from 768px (sm and below)
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="landing-page">
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
            }}
          >
            NexWork
          </Typography>

          {/* Hamburger menu for mobile and tablet */}
          {isMobileOrTablet ? (
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box display="flex" alignItems="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {!user ? (
                <>
                  {/* <Button color="inherit" component={Link} to="/Signup">
                    Sign Up
                  </Button> */}
                  <Button color="inherit" component={Link} to="/Login">
                    Login
                  </Button>
                </>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleIconClick}>
                  <Avatar sx={{ marginRight: 1 }}>
                    <FaUserCircle />
                  </Avatar>
                  <Typography variant="body1" sx={{ color: 'white' }}>
                    {userName}
                  </Typography>
                  {showLogout && (
                    <Button color="inherit" sx={{ marginLeft: 2 }} onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile and Tablet Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {!user ? (
            <>
              {/* <ListItem button component={Link} to="/Signup">
                <ListItemText primary="Sign Up" />
              </ListItem> */}
              <ListItem button component={Link} to="/Login">
                <ListItemText primary="Login" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={handleIconClick}>
                <ListItemText primary={userName} />
              </ListItem>
              <Divider />
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;

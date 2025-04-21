import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box, Drawer, List, ListItem, ListItemText, Divider, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logoImage from '../assets/favicon.png';

// ✅ Generate random avatar based on user info (stable across sessions)
const getRandomAvatar = (seed) => {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}`;
};

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
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
          if (data) {
            setUserName(data.name);
            setUserRole(data.role);
          } else {
            setUserName(currentUser.email);
          }
        });
      } else {
        setUserName('');
        setUserRole('');
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
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogoClick = () => {
    if (user) {
      if (user.uid === '7inDJHenyPVtaxtJ3p37IpveinU2') {
        navigate('/admins/AdminDashboard');
        console.log("admin dashboard");
      } else {
        navigate('/user/UserDashboard');
      }
    } else {
      console.log("No user logged in");
    }
  };

  return (
    <div className="landing-page">
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
            onClick={handleLogoClick}
          >
            <Box
              component="img"
              src={logoImage}
              alt="NexWork Logo"
              sx={{
                height: 32,
                width: 32,
                mr: 1,
                borderRadius: '6px',
                backgroundColor: 'white',
                padding: '4px',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
                fontWeight: 600,
              }}
            >
              NexWork
            </Typography>
          </Box>

          {!isMobileOrTablet ? (
            <Box display="flex" alignItems="center">
              {!user ? (
                <Button color="inherit" component={Link} to="/Login">
                  Login
                </Button>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleIconClick}>
                  <Avatar
                    src={getRandomAvatar(user?.email || user?.uid || 'guest')}
                    alt="User Avatar"
                    sx={{
                      width: 40,
                      height: 40,
                      marginRight: 1,
                      border: '2px solid white',
                      backgroundColor: 'white',
                    }}
                  />
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
          ) : (
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {!user ? (
            <ListItem button component={Link} to="/Login">
              <ListItemText primary="Login" />
            </ListItem>
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

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { FaUserCircle } from 'react-icons/fa';
// import {
//   AppBar, Toolbar, Typography, Button, IconButton, Avatar, Box,
//   Drawer, List, ListItem, ListItemText, Divider, useMediaQuery, useTheme
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import logoImage from '../assets/favicon.png';

// function Navbar() {
//   const navigate = useNavigate();
//   const auth = getAuth();
//   const db = getDatabase();

//   const [user, setUser] = useState(null);
//   const [userName, setUserName] = useState('');
//   const [userRole, setUserRole] = useState('');
//   const [showLogout, setShowLogout] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         const uid = currentUser.uid;
//         const userRef = ref(db, `users/${uid}`);
//         onValue(userRef, (snapshot) => {
//           const data = snapshot.val();
//           if (data) {
//             setUserName(data.name);
//             setUserRole(data.role);
//           } else {
//             setUserName(currentUser.email);
//           }
//         });
//       } else {
//         setUserName('');
//         setUserRole('');
//       }
//     });

//     return () => unsubscribe();
//   }, [auth, db]);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigate('/Login');
//     } catch (error) {
//       console.error("Error logging out:", error);
//     }
//   };

//   const handleIconClick = () => {
//     setShowLogout(!showLogout);
//   };

//   const theme = useTheme();
//   const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('sm'));

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleLogoClick = () => {
//     if (user) {
//       if (user.uid === '7inDJHenyPVtaxtJ3p37IpveinU2') {
//         navigate('/admins/AdminDashboard');
//         console.log("admin dashboard");
//       } else {
//         navigate('/user/UserDashboard');
//       }
//     } else {
//       console.log("No user logged in");
//     }
//   };

//   return (
//     <div className="landing-page">
//       <AppBar position="static" sx={{ backgroundColor: 'black' }}>
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Box
//             component="div"
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               textDecoration: 'none',
//               color: '#fff',
//               cursor: 'pointer',
//             }}
//             onClick={handleLogoClick}
//           >
//             <Box
//               component="img"
//               src={logoImage}
//               alt="NexWork Logo"
//               sx={{
//                 height: 32,
//                 width: 32,
//                 mr: 1,
//                 borderRadius: '6px',
//                 backgroundColor: 'white',
//                 padding: '4px',
//               }}
//             />
//             <Typography
//               variant="h6"
//               sx={{
//                 fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.7rem' },
//                 fontWeight: 600,
//               }}
//             >
//               NexWork
//             </Typography>
//           </Box>

//           {!isMobileOrTablet ? (
//             <Box display="flex" alignItems="center">
//               {!user ? (
//                 <Button color="inherit" component={Link} to="/Login">
//                   Login
//                 </Button>
//               ) : (
//                 <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={handleIconClick}>
//                   <Avatar
//                     // src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user?.uid}`}
//                     // src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.uid}`}
//                     // src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`}
//                     // src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${user?.uid}`}
//                     alt={userName}
//                     sx={{ marginRight: 1 }}
//                   />
//                   <Typography variant="body1" sx={{ color: 'white' }}>
//                     {userName}
//                   </Typography>
//                   {showLogout && (
//                     <Button color="inherit" sx={{ marginLeft: 2 }} onClick={handleLogout}>
//                       Logout
//                     </Button>
//                   )}
//                 </Box>
//               )}
//             </Box>
//           ) : (
//             <IconButton
//               color="inherit"
//               onClick={toggleDrawer}
//               sx={{ display: { xs: 'block', sm: 'none' } }}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//         </Toolbar>
//       </AppBar>

//       <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
//         <List>
//           {!user ? (
//             <ListItem button component={Link} to="/Login">
//               <ListItemText primary="Login" />
//             </ListItem>
//           ) : (
//             <>
//               <ListItem button onClick={handleIconClick}>
//                 <ListItemText primary={userName} />
//               </ListItem>
//               <Divider />
//               <ListItem button onClick={handleLogout}>
//                 <ListItemText primary="Logout" />
//               </ListItem>
//             </>
//           )}
//         </List>
//       </Drawer>
//     </div>
//   );
// }

// export default Navbar;

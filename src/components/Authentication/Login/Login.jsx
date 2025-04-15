import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
import './login.css';
import { author } from "../../../fbconfig";

import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleDetails = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const checkUserRoleAndRedirect = async (email) => {
    const db = getDatabase();

    const pathsToCheck = [
      { refPath: "users/employers", defaultRole: "employer" },
      { refPath: "users/managers", defaultRole: "manager" }
    ];

    for (const path of pathsToCheck) {
      const dbRef = ref(db, path.refPath);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const usersData = snapshot.val();

        for (const username in usersData) {
          const user = usersData[username];
          if (user.email === email) {
            const role = user.role || path.defaultRole;

            // ✅ Redirect based on role
            if (role === "manager") {
              navigate("/admins/AdminDashboard");
            } else if (role === "employer") {
              navigate("/user/UserDashboard");
            } else {
              navigate("/Dashboard");
            }
            

            return true; 
          }
        }
      }
    }

    return false;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;

    try {
      const userCredential = await signInWithEmailAndPassword(author, email, password);
      const user = userCredential.user;

      const found = await checkUserRoleAndRedirect(email);
      if (!found) {
        alert("User not found in database.");
      } else {
        alert("Logged in successfully!");
      }

    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container className="login-container" component="main" maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#121212",
          padding: 4,
          boxShadow: "4px 4px 20px rgba(155, 89, 182, 0.3)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#9b59b6" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: "#fff" }}>
          Log In
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3, width: "100%" }}>
          <TextField
            fullWidth
            label="email"
            name="email"
            type="email"
            variant="standard"
            margin="normal"
            onChange={handleDetails}
            required
            sx={{
              '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' },
              '& input': { color: 'white' }
            }}
          />
          <TextField
            fullWidth
            label="password"
            name="password"
            type="password"
            variant="standard"
            margin="normal"
            onChange={handleDetails}
            required
            sx={{
              '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' },
              '& input': { color: 'white' }
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "#9b59b6",
              color: "white",
              "&:hover": { backgroundColor: "#8e44ad" },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;



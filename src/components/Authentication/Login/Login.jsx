import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { author } from "../../../fbconfig";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleDetails = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const checkUserRoleAndRedirect = async (email) => {
    const db = getDatabase();
    const paths = [
      { refPath: "users/employers", role: "employer" },
      { refPath: "users/managers", role: "manager" },
    ];

    for (const { refPath, role } of paths) {
      const snapshot = await get(ref(db, refPath));
      if (snapshot.exists()) {
        const users = snapshot.val();
        for (let key in users) {
          if (users[key].email === email) {
            toast.success("Logged in successfully!");
            setTimeout(() => {
              if (role === "manager") navigate("/admins/AdminDashboard");
              else if (role === "employer") navigate("/user/UserDashboard");
              else navigate("/Launchpage");
            }, 1000);
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      toast.warn("Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(author, login.email, login.password);
      const found = await checkUserRoleAndRedirect(login.email);
      if (!found) toast.error("User not found in database.");
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  // 💡 Demo login fill function
  const fillDemoLogin = (role) => {
    if (role === "employer") {
      setLogin({ email: "sagar@gmail.com", password: "123456" });
    } else if (role === "manager") {
      setLogin({ email: "rahulgoud@gmail.com", password: "123456" });
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background:
          "linear-gradient(45deg, rgba(238,119,82,0.2), rgba(231,60,126,0.2), rgba(35,166,213,0.2), rgba(35,213,171,0.2))",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          {/* Optional logo or icon */}
        </Box>

        <Typography variant="subtitle1" sx={{ mb: 3, color: "text.secondary" }}>
          Sign In on NexWork
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label="Username"
            name="email"
            type="email"
            value={login.email}
            onChange={handleDetails}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={login.password}
            onChange={handleDetails}
            margin="normal"
            variant="outlined"
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember this Device"
            />
            <Link href="#" variant="body2" color="primary">
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#7C3AED",
              "&:hover": { backgroundColor: "#5B21B6" },
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Sign in
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3 }}>
          New to NexWork?{" "}
          <Link
            component={RouterLink}
            to="/signup"
            color="primary"
            underline="hover"
          >
            Create an account
          </Link>
        </Typography>

        {/* ✅ Demo Buttons */}
        <Stack direction="column" spacing={1} mt={3}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => fillDemoLogin("employer")}
          >
            Use Employer Demo
          </Button>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => fillDemoLogin("manager")}
          >
            Use Manager Demo
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;

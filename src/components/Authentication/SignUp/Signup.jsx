import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { author, db } from "../../../fbconfig";
import { set, ref } from "firebase/database";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleDetails = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, department } = signup;

    try {
      const signupUser = await createUserWithEmailAndPassword(
        author,
        email,
        password
      );

      await set(ref(db, `users/employers/${name}`), {
        name,
        email,
        department,
        id: signupUser.user.uid,
      });

      toast.success("Signup successful! ");
      setTimeout(() => navigate("/Login"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#d7e8f7",
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
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 3, color: "text.primary", fontWeight: 600 }}
        >
          Create your NexWork Account
        </Typography>

        <Box component="form" onSubmit={handleSignup}>
          <TextField
            fullWidth
            size="small"
            label="Name"
            name="name"
            type="text"
            variant="outlined"
            margin="normal"
            onChange={handleDetails}
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            onChange={handleDetails}
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={handleDetails}
            required
          />

          <FormControl fullWidth size="small" margin="normal" required>
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={signup.department}
              onChange={handleDetails}
              label="Department"
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </Select>
          </FormControl>

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
            Sign Up
          </Button>
        </Box>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Already have an account?{" "}
          <Link
            component={RouterLink}
            to="/Login"
            color="primary"
            underline="hover"
          >
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;

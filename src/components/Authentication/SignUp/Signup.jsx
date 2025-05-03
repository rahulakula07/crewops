import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../fbconfig";
import { set, ref } from "firebase/database";
import { toast } from "react-toastify";
import logoImage from '../../../assets/favicon.png';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
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

  const handleDetails = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, department } = signup;

    try {
      const secondaryApp = getAuth();
      const newUser = await createUserWithEmailAndPassword(secondaryApp, email, password);
      await set(ref(db, `users/employers/${name}`), {
        name,
        email,
        department,
        id: newUser.user.uid,
      });
      await newUser.user.delete();

      toast.success("Employee added successfully!");
      setSignup({
        name: "",
        email: "",
        password: "",
        department: "",
      });

    } catch (err) {
      console.error("Signup failed:", err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        // backgroundColor: "#d7e8f7",
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
        <Box display="flex" justifyContent="center" mb={2}>
          <img src={logoImage} alt="Logo" width={30} height={30} />
        </Box>

        <Typography
          variant="h6"
          sx={{ mb: 3, color: "text.primary", fontWeight: 600 }}
        >
          Create NexWork New Employee
        </Typography>

        <Box component="form" onSubmit={handleSignup}>
          <TextField
            fullWidth
            size="small"
            label="Employee Name"
            name="name"
            type="text"
            variant="outlined"
            margin="normal"
            onChange={handleDetails}
            value={signup.name}
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Employee Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            onChange={handleDetails}
            value={signup.email}
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Employee Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={handleDetails}
            value={signup.password}
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
            Add Employee
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;


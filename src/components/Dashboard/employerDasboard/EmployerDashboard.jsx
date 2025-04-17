import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Modal,
  Skeleton,
} from "@mui/material";
import { ref, push } from "firebase/database";
import { db } from "../../../fbconfig";
import { getAuth } from "firebase/auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ScheduleIcon from "@mui/icons-material/Schedule";
import WorkIcon from "@mui/icons-material/Work";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    from: "",
    to: "",
    reason: "",
  });
  const [user, setUser] = useState(null);

  const managerUid = "7inDJHenyPVtaxtJ3p37IpveinU2"; // Replace with actual logic

  const stats = [
    {
      title: "Attendance Today",
      value: "Present",
      icon: <ScheduleIcon />,
      color: "#32CD32",
    },
    {
      title: "Pending Tasks",
      value: 3,
      icon: <WorkIcon />,
      color: "#FF6347",
    },
    {
      title: "Leave Balance",
      value: "10 Days",
      icon: <MonetizationOnIcon />,
      color: "#FFD700",
    },
  ];

  const taskData = [
    { name: "Task 1", progress: 80 },
    { name: "Task 2", progress: 50 },
    { name: "Task 3", progress: 30 },
  ];

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFormChange = (e) => {
    setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
  };

  const handleLeaveSubmit = async () => {
    if (!user) {
      toast.error("No user is logged in.");
      return;
    }

    try {
      const leaveData = {
        ...leaveForm,
        userEmail: user.email,
        userName: user.displayName || user.email.split("@")[0] || "Unknown User",
        submittedAt: new Date().toISOString(),
      };

      const leaveApplicationsRef = ref(
        db,
        `managers/${managerUid}/leaveApplications`
      );

      await push(leaveApplicationsRef, leaveData);
      toast.success("Leave request submitted!");
      setLeaveForm({ from: "", to: "", reason: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error submitting leave:", error);
      toast.error("Error submitting leave.");
    }
  };

  return (
    <div className="user-dashboard-container">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {isLoading
            ? new Array(3).fill(0).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#f0f0f0",
                    }}
                  >
                    <Box>
                      <Skeleton variant="text" width={120} height={30} />
                      <Skeleton variant="text" width={60} height={40} />
                    </Box>
                    <Skeleton variant="circular" width={40} height={40} />
                  </Paper>
                </Grid>
              ))
            : stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: stat.color,
                      color: "white",
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{stat.title}</Typography>
                      <Typography variant="h4">{stat.value}</Typography>
                    </Box>
                    {stat.icon}
                  </Paper>
                </Grid>
              ))}

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Task Progress
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={taskData}>
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#8884d8" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Request Leave</Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => setOpen(true)}
              >
                Apply for Leave
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Modal for Leave Form */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4,
            outline: "none",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Leave Application
          </Typography>
          <TextField
            fullWidth
            type="date"
            name="from"
            label="From Date"
            InputLabelProps={{ shrink: true }}
            value={leaveForm.from}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            name="to"
            label="To Date"
            InputLabelProps={{ shrink: true }}
            value={leaveForm.to}
            onChange={handleFormChange}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Reason"
            name="reason"
            value={leaveForm.reason}
            onChange={handleFormChange}
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc", // Normal border color
                },
                "&:hover fieldset": {
                  borderColor: "#aaa", // Hover border color
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent", // Remove blue border on focus
                },
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                boxShadow: "none", // Remove focus glow
              },
              "& .MuiInputBase-input": {
                outline: "none", // Remove outline from input field
              },
            }}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#32CD32",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#28a428",
                },
              }}
              onClick={handleLeaveSubmit}
            >
              Apply Leave
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default UserDashboard;

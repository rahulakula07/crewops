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
  Card,
  CardContent,
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
      icon: <ScheduleIcon sx={{ fontSize: 30 }} />,
      color: "#4caf50",
    },
    {
      title: "Pending Tasks",
      value: 3,
      icon: <WorkIcon sx={{ fontSize: 30 }} />,
      color: "#f44336",
    },
    {
      title: "Leave Balance",
      value: "10 Days",
      icon: <MonetizationOnIcon sx={{ fontSize: 30 }} />,
      color: "#ff9800",
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={180} />
            ) : (
              <Card
                sx={{
                  backgroundColor: stat.color,
                  color: "#fff",
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
                    {stat.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography variant="h5">{stat.value}</Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
              Task Progress
            </Typography>
            {isLoading ? (
              <Skeleton variant="rectangular" width="100%" height={250} />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={taskData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="progress" fill="#1976d2" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#1976d2",
              color: "#fff",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: 3,
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
            onClick={() => setOpen(true)}
          >
            <Typography variant="h6">Request Leave</Typography>
            <Typography variant="body1" mt={1}>
              Click here to apply for leave
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Leave Form Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            p: 4,
            borderRadius: 3,
            boxShadow: 6,
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
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleLeaveSubmit}
              sx={{
                backgroundColor: "#2e7d32",
                borderRadius: 2,
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#1b5e20",
                },
              }}
            >
              Aplly Leave
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default UserDashboard;

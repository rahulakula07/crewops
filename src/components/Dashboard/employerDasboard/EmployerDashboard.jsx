import React, { useState, useEffect } from "react";
import {
  Box,Grid,Typography,Card,CardContent,Button,TextField,Dialog,DialogActions,DialogContent,DialogTitle,Skeleton,} from "@mui/material";
import {AccessTime,BusinessCenter, AttachMoney, Send,} from "@mui/icons-material";
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer,CartesianGrid,} from "recharts";
import { getAuth } from "firebase/auth";
import { ref, push } from "firebase/database";
import { db } from "../../../fbconfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// InfoCard updated to support onClick
const InfoCard = ({ icon, label, value, color, onClick }) => (
  <Card
    onClick={onClick}
    sx={{
      backgroundColor: color,
      color: "white",
      borderRadius: 2,
      height: "100%",
      boxShadow: 3,
      cursor: onClick ? "pointer" : "default",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: onClick ? "scale(1.02)" : "none",
        boxShadow: onClick ? 6 : 3,
      },
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" gap={2}>
        {icon}
        <Box>
          <Typography variant="h6">{label}</Typography>
          <Typography variant="h5">{value}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [leaveData, setLeaveData] = useState({ from: "", to: "", reason: "" });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const managerUid = "7inDJHenyPVtaxtJ3p37IpveinU2"; // Static manager ID

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

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleApplyLeave = async () => {
    if (!user) {
      toast.error("No user is logged in.");
      return;
    }

    try {
      const leavePayload = {
        ...leaveData,
        userEmail: user.email,
        userName: user.displayName || user.email.split("@")[0],
        submittedAt: new Date().toISOString(),
      };

      const leaveRef = ref(db, `managers/${managerUid}/leaveApplications`);
      await push(leaveRef, leavePayload);

      toast.success("Leave request submitted!");
      setLeaveData({ from: "", to: "", reason: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error submitting leave:", error);
      toast.error("Error submitting leave.");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box p={4}>
      {/* Top Info Cards */}
      <Grid container spacing={3}>
        {isLoading
          ? new Array(4).fill(0).map((_, idx) => (
            <Grid item xs={12} md={3} key={idx}>
              <Card sx={{ p: 2 }}>
                <Skeleton variant="text" width={100} height={30} />
                <Skeleton variant="text" width={60} height={30} />
              </Card>
            </Grid>
          ))
          : <>
            <Grid item xs={12} md={3}>
              <InfoCard
                icon={<AccessTime />}
                label="Attendance Today"
                value="Present"
                color="#4caf50"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoCard
                icon={<BusinessCenter />}
                label="Pending Tasks"
                value="3"
                color="#f44336"
                onClick={() => navigate("/user/Usertasks")}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InfoCard
                icon={<AttachMoney />}
                label="Leave Balance"
                value="10 Days"
                color="#ff9800"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Card
                sx={{
                  backgroundColor: "#2196f3",
                  color: "white",
                  borderRadius: 2,
                  height: "100%",
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="h6">Request Leave</Typography>
                  <Button
                    variant="outlined"
                    endIcon={<Send />}
                    sx={{
                      mt: 1,
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: "#eee",
                      },
                    }}
                    onClick={handleOpen}
                  >
                    Apply
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </>
        }
      </Grid>

      {/* Task Progress Chart */}
      <Box mt={5}>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Task Progress
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskData} barCategoryGap="20%" barSize={40}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill="#1976d2" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Leave Request Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold">Apply for Leave</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="dense"
            label="From Date"
            type="date"
            name="from"
            required
            value={leaveData.from}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="To Date"
            type="date"
            name="to"
            required
            value={leaveData.to}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Reason"
            name="reason"
            multiline
            rows={4}
            placeholder="Briefly describe your reason for leave..."
            required
            value={leaveData.reason}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleApplyLeave} variant="contained">
            Apply Leave
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default UserDashboard;


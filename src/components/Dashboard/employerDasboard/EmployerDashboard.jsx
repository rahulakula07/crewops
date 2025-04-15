import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";
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

const UserDashboard = () => {
  const stats = [
    { title: "Attendance Today", value: "Present", icon: <ScheduleIcon />, color: "#32CD32" },
    { title: "Pending Tasks", value: 3, icon: <WorkIcon />, color: "#FF6347" },
    { title: "Leave Balance", value: "10 Days", icon: <MonetizationOnIcon />, color: "#FFD700" },
  ];

  const taskData = [
    { name: "Task 1", progress: 80 },
    { name: "Task 2", progress: 50 },
    { name: "Task 3", progress: 30 },
  ];

  return (
    <div className="user-dashboard-container"> 
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
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
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Apply for Leave
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserDashboard;

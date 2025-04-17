import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, Skeleton, Paper } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaBuilding, FaDollarSign } from "react-icons/fa";
import { db } from "../../../fbconfig";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = ref(db, "users");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const count = Object.keys(users).length;
        setUserCount(count);
      } else {
        setUserCount(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const chartData = [
    { name: "HR", employees: 4 },
    { name: "Tech", employees: 5 },
    { name: "Sales", employees: 3 },
    { name: "Marketing", employees: 2 },
    { name: "Finance", employees: 4 },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  const stats = [
    {
      title: "Total Employees",
      value: userCount,
      color: "#6f42c1",
      icon: <FaUsers />,
      path: "/admins/employer",
    },
    {
      title: "Departments",
      value: 5,
      color: "#dc3545",
      icon: <FaBuilding />,
      path: "/admins/Departments",
    },
    {
      title: "Total Payroll",
      value: "$25,000",
      color: "#ffc107",
      icon: <FaDollarSign />,
      path: null,
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={180} />
            ) : (
              <Card
                sx={{
                  backgroundColor: stat.color,
                  color: "#fff",
                  cursor: stat.path ? "pointer" : "default",
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": {
                    transform: stat.path ? "scale(1.02)" : "none",
                  },
                }}
                onClick={() => stat.path && handleNavigate(stat.path)}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Box display="flex" justifyContent="center" alignItems="center" mb={1} fontSize={24}>
                    {stat.icon}
                    <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Typography variant="h5" component="div">
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>

      <Box mt={5}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 3 }}>
          <Typography variant="h6" gutterBottom>
            Employees per Department
          </Typography>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={300} />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="#8884d8" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;

import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Box, Skeleton, Paper } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaBuilding, FaDollarSign, FaUserPlus, FaFileAlt } from "react-icons/fa";
import { db } from "../../../fbconfig";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [appliedLeaves, setAppliedLeaves] = useState(0);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const usersRef = ref(db, "users/employers");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        let totalUsers = 0;
        const departments = {}; 


        Object.entries(users).forEach(([userId, userData]) => {
          totalUsers += 1; // Increment user count
          const department = userData.department || "Unassigned"; 
          if (departments[department]) {
            departments[department] += 1;
          } else {
            departments[department] = 1;
          }
        });

        setUserCount(totalUsers);

        // Create dynamic chart data based on the grouped departments
        const dynamicChartData = Object.entries(departments).map(([department, count]) => ({
          name: department,
          employees: count,
        }));

        setChartData(dynamicChartData);
      } else {
        setUserCount(0);
        setChartData([]);
      }
      setLoading(false);
    });

    // Leave application data
    const managerUid = "7inDJHenyPVtaxtJ3p37IpveinU2";
    const leavesRef = ref(db, `managers/${managerUid}/leaveApplications`);

    const unsubscribeLeaves = onValue(leavesRef, (snapshot) => {
      if (snapshot.exists()) {
        const leaveApplications = snapshot.val();
        const totalLeaves = Object.keys(leaveApplications).length;
        setAppliedLeaves(totalLeaves);
      } else {
        setAppliedLeaves(0);
      }
    });

    // Cleanup
    return () => {
      unsubscribe();
      unsubscribeLeaves();
    };
  }, []);

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
      value: chartData.length,
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
    {
      title: "Applied Leaves",
      value: appliedLeaves,
      color: "#198754",
      icon: <FaFileAlt />,
      path: "/admins/Leave",
    },
    {
      title: "Add New Employee",
      value: "+ Add",
      color: "#0d6efd",
      icon: <FaUserPlus />,
      path: "/admins/Signup",
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

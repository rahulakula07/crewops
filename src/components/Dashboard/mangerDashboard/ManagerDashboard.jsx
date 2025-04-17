import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaBuilding, FaDollarSign } from "react-icons/fa";
import { db } from "../../../fbconfig";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Skeleton, Box } from "@mui/material"; 

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [data, setData] = useState([]);
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
    <Container>
      <Row>
        {stats.map((stat, index) => (
          <Col md={4} key={index}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={180} />
            ) : (
              <Card
                className="text-white text-center"
                style={{
                  backgroundColor: stat.color,
                  cursor: stat.path ? "pointer" : "default",
                }}
                onClick={() => stat.path && handleNavigate(stat.path)}
              >
                <Card.Body>
                  <Card.Title className="d-flex align-items-center justify-content-center">
                    {stat.icon}
                    <span className="ms-2">{stat.title}</span>
                  </Card.Title>
                  <Card.Text style={{ fontSize: "1.5rem" }}>{stat.value}</Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        ))}
      </Row>

      <Row>
        <Col md={12}>
          <Card className="p-3">
            <Card.Title>Employees per Department</Card.Title>
            {loading ? (
              <Box sx={{ width: "100%" }}>
                <Skeleton variant="rectangular" width="100%" height={300} />
              </Box>
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;

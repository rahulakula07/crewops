import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaBuilding, FaCheckCircle, FaDollarSign, FaCog, FaSignOutAlt, FaThLarge, FaUserTie } from "react-icons/fa";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAxxisbu1VitzD0LsBV2t50Qq9YU9i0Yhg",
  authDomain: "employermangement.firebaseapp.com",
  projectId: "employermangement",
  storageBucket: "employermangement.firebasestorage.app",
  messagingSenderId: "513827942738",
  appId: "1:513827942738:web:903907cc5c69686a250a8b",
  measurementId: "G-C82XX8Z38F"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    attendance: 0,
    payroll: 0,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const employeesSnap = await get(ref(db, "employees"));
        const departmentsSnap = await get(ref(db, "departments"));
        const attendanceSnap = await get(ref(db, "attendance"));
        let totalPayroll = 0;
        if (employeesSnap.exists()) {
          Object.values(employeesSnap.val()).forEach((employee) => {
            totalPayroll += employee.salary || 0;
          });
        }
        setStats({
          employees: employeesSnap.exists() ? Object.keys(employeesSnap.val()).length : 0,
          departments: departmentsSnap.exists() ? Object.keys(departmentsSnap.val()).length : 0,
          attendance: attendanceSnap.exists() ? Object.keys(attendanceSnap.val()).length : 0,
          payroll: totalPayroll,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="d-flex">
      <div className="bg-light vh-100 p-3" style={{ width: "250px" }}>
        <h4 className="text-dark mb-4">Ems Dashboard</h4>
        <ListGroup variant="flush">
          <ListGroup.Item className="border-0"><FaThLarge className="me-2" /> Dashboard</ListGroup.Item>
          <ListGroup.Item className="border-0"><FaUserTie className="me-2" /> Employees</ListGroup.Item>
          <ListGroup.Item className="border-0"><FaBuilding className="me-2" /> Departments</ListGroup.Item>
          <ListGroup.Item className="border-0"><FaCog className="me-2" /> Settings</ListGroup.Item>
          <ListGroup.Item className="border-0 text-danger"><FaSignOutAlt className="me-2" /> Logout</ListGroup.Item>
        </ListGroup>
      </div>

      <Container className="mt-4">
        <Row>
          {[{ title: "Total Employees", value: stats.employees, color: "#6f42c1", icon: <FaUsers /> },
            { title: "Departments", value: stats.departments, color: "#dc3545", icon: <FaBuilding /> },
            { title: "Attendance Today", value: stats.attendance, color: "#28a745", icon: <FaCheckCircle /> },
            { title: "Total Payroll", value: `$${stats.payroll.toLocaleString()}`, color: "#ffc107", icon: <FaDollarSign /> },
          ].map((stat, index) => (
            <Col md={3} key={index} className="mb-3">
              <Card className="text-white text-center" style={{ backgroundColor: stat.color }}>
                <Card.Body>
                  <Card.Title className="d-flex align-items-center justify-content-center">
                    {stat.icon} <span className="ms-2">{stat.title}</span>
                  </Card.Title>
                  <Card.Text style={{ fontSize: "1.5rem" }}>{stat.value}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col md={12}>
            <Card className="p-3">
              <Card.Title>Employee Growth</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="employees" fill="#8884d8" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
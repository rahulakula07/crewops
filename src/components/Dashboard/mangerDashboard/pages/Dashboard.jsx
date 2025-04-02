import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaUsers, FaBuilding, FaCheckCircle, FaDollarSign } from "react-icons/fa";
import { db } from "../../../../fbconfig";
import { ref, get } from "firebase/database";
import "./managerDashboard.css"

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
  

      <Container className="mt-4">
        <Row>
          {[
            { title: "Total Employees", value: stats.employees, color: "#6f42c1", icon: <FaUsers /> },
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

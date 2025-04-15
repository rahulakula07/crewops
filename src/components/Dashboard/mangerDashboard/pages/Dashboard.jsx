// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { FaUsers, FaBuilding, FaDollarSign } from "react-icons/fa";
// import { db } from "../../../fbconfig"; 
// import { ref, onValue } from "firebase/database";
// import "./managerDashboard.css";

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     employees: 0,
//     departments: 5,
//     payroll: "25000$",
//   });
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const employeesRef = ref(db, "employees");

//     const unsubscribeEmployees = onValue(employeesRef, (snapshot) => {
//       let totalPayroll = 0;
//       let employeesCount = 0;
//       const chartData = {};

//       if (snapshot.exists()) {
//         const employees = snapshot.val();
//         for (const empId in employees) {
//           const emp = employees[empId];
//           employeesCount++;
//           totalPayroll += emp.salary || 0;

//           const dept = emp.department || "Unknown";
//           chartData[dept] = (chartData[dept] || 0) + 1;
//         }
//       }

//       setStats({
//         employees: employeesCount,
//         departments: Object.keys(chartData).length,
//         payroll: totalPayroll,
//       });

//       const formattedData = Object.entries(chartData).map(([dept, count]) => ({
//         name: dept,
//         employees: count,
//       }));
//       setData(formattedData);
//     });

//     return () => unsubscribeEmployees();
//   }, []);

//   return (
//     <div className="d-flex">
//       <Container className="mt-4">
//         <Row>
//           {[ 
//             { title: "Total Employees", value: stats.employees, color: "#6f42c1", icon: <FaUsers /> },
//             { title: "Departments", value: stats.departments, color: "#dc3545", icon: <FaBuilding /> },
//             { title: "Total Payroll", value: `$${stats.payroll.toLocaleString()}`, color: "#ffc107", icon: <FaDollarSign /> },
//           ].map((stat, index) => (
//             <Col md={4} key={index} className="mb-3">
//               <Card className="text-white text-center" style={{ backgroundColor: stat.color }}>
//                 <Card.Body>
//                   <Card.Title className="d-flex align-items-center justify-content-center">
//                     {stat.icon} <span className="ms-2">{stat.title}</span>
//                   </Card.Title>
//                   <Card.Text style={{ fontSize: "1.5rem" }}>{stat.value}</Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>

//         <Row>
//           <Col md={12}>
//             <Card className="p-3">
//               <Card.Title>Employees per Department</Card.Title>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={data}>
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="employees" fill="#8884d8" barSize={40} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default AdminDashboard;




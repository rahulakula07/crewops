import React from "react";
import { ListGroup } from "react-bootstrap";
import {
  FaBuilding,
  FaCog,
  FaSignOutAlt,
  FaThLarge,
  FaUserTie,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light vh-100 p-3" style={{ width: "250px" }}>
      <h4 className="text-dark mb-4">HRbes</h4>
      <ListGroup variant="flush">
        <ListGroup.Item
          as={Link}
          to="/admins/AdminDashboard"
          className="border-0"
          action
        >
          <FaThLarge className="me-2" /> Dashboard
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/admins/employer"
          className="border-0"
          action
        >
          <FaUserTie className="me-2" /> Employees
        </ListGroup.Item>

        <ListGroup.Item
          as={Link}
          to="/admins/Departments"
          className="border-0"
          action
        >
          <FaBuilding className="me-2" /> Departments
        </ListGroup.Item>

        <ListGroup.Item className="border-0" action>
          <FaCog className="me-2" /> Settings
        </ListGroup.Item>

        <ListGroup.Item className="border-0 text-danger" action>
          <FaSignOutAlt className="me-2" /> Logout
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;


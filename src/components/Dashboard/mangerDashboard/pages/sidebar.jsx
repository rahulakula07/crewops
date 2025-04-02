import React from "react";
import { ListGroup } from "react-bootstrap";
import { FaUsers, FaBuilding, FaCheckCircle, FaDollarSign, FaCog, FaSignOutAlt, FaThLarge, FaUserTie } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";


const Sidebar=()=>{
    const navigate=useNavigate();
    return(
        // <div className="d-flex">
        <div className=" bg-light vh-100 p-3" style={{ width: "250px" }}>
          <h4 className="text-dark mb-4">HRbes</h4>
          <ListGroup variant="flush" className="flush" >
            <button ><Link to="/AdminDashboard"><ListGroup.Item className="border-0"><FaThLarge className="me-2" /> Dashboard</ListGroup.Item></Link></button>
            {/* <Link to="/AdminDasboard"><ListGroup.Item className="border-0"><FaUserTie className="me-2" /> Employees</ListGroup.Item></Link> */}
            <button ><Link to="/employer"><ListGroup.Item className="border-0"><FaUserTie className="me-2" /> Employees</ListGroup.Item></Link></button>
            <button><Link to="/Departments"><ListGroup.Item className="border-0"><FaBuilding className="me-2" /> Departments</ListGroup.Item></Link></button>
            <button><ListGroup.Item className="border-0"><FaCog className="me-2" /> Settings</ListGroup.Item></button>
            <button><ListGroup.Item className="border-0 text-danger"><FaSignOutAlt className="me-2" /> Logout</ListGroup.Item></button>
          </ListGroup>
        </div>
    )
}
export default Sidebar;
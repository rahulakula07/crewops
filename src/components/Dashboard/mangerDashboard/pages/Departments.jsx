import React, { useState, useEffect } from "react";
import { db } from "../../../../fbconfig";
import { ref, get } from "firebase/database";
import { Button, colors, TextField } from "@mui/material";

const Departments = () => {
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];


    const fetchUsersByDepartment = async (department) => {
        setSelectedDepartment(department);
        setSearchQuery("");

        try {
            const usersRef = ref(db, "users/employers");
            const snapshot = await get(usersRef);

            if (snapshot.exists()) {
                const data = snapshot.val();
                const departmentUsers = Object.keys(data)
                    .map((key) => ({ id: key, ...data[key] }))
                    .filter((user) => user.department === department);

                setUsers(departmentUsers);
                setFilteredUsers(departmentUsers);
            } else {
                setUsers([]);
                setFilteredUsers([]);
            }
        } catch (error) {
            console.error("Error fetching department users:", error);
        }
    };


    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(query)
        );
        setFilteredUsers(filtered);
    };

    return (
        <div className="d-flex flex-column align-items-center p-4">
            <h4 className="text-white mb-3">Departments</h4>

            {/* Department Buttons */}
            <div className="mb-3">
                {departments.map((dept) => (
                    <Button
                        key={dept}
                        variant={selectedDepartment === dept ? "contained" : "outlined"}
                        color=""
                        onClick={() => fetchUsersByDepartment(dept)}
                        sx={{
                            margin: "5px",
                            color: "black",
                            backgroundColor: "white",
                            "&:hover": { backgroundColor: "#f0f0f0" },
                            border: "white"

                        }}
                    >
                        {dept}
                    </Button>
                ))}
            </div>

            {/* Search Bar */}
            {selectedDepartment && (
                <TextField
                    label="Search User"
                    variant="standard" 
                    fullWidth
                    value={searchQuery}
                    onChange={handleSearch}
                    sx={{
                        backgroundColor: "white",
                        color: "green",
                        borderRadius: "5px",
                        mb: 2,
                        "& .MuiInputBase-input": { color: "black" }, 
                        "& .MuiInput-underline:before, & .MuiInput-underline:after": { borderBottom: "none" } 
                    }}
                />
            )}


            {/* Display Users */}
            <div className="w-100">
                {selectedDepartment && (
                    <>
                        <h5 className="text-light">{selectedDepartment} Department</h5>
                        {filteredUsers.length > 0 ? (
                            <ul className="list-group">
                                {filteredUsers.map((user) => (
                                    <li key={user.id} className="list-group-item p-2 border rounded shadow-sm my-2">
                                        <strong>{user.name}</strong> - {user.email}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-white" >No users found in this department.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Departments;

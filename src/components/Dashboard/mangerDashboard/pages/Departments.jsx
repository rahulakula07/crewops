import React, { useState, useEffect } from "react";
import { db } from "../../../../fbconfig";
import { ref, get, update } from "firebase/database";
import {
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Departments = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];

  const fetchUsersByDepartment = async (department) => {
    setSelectedDepartment(department);
    setSearchQuery("");
    setSelectedUser(null);
    setLoading(true);

    try {
      const usersRef = ref(db, "users/employers");
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const departmentUsers = Object.keys(data)
          .map((key) => ({ nameKey: key, ...data[key] }))
          .filter((user) => user.department === department);

        setUsers(departmentUsers);
        setFilteredUsers(departmentUsers);
      } else {
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Error fetching department users:", error);
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
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

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleAddTask = async () => {
    if (!newTask.trim() || !selectedUser) {
      toast.warn("Please enter a task and select a user.");
      return;
    }

    const updatedTasks = selectedUser.tasks
      ? [...selectedUser.tasks, newTask]
      : [newTask];

    try {
      await update(ref(db, `users/employers/${selectedUser.nameKey}`), {
        ...selectedUser,
        tasks: updatedTasks,
      });

      setSelectedUser({ ...selectedUser, tasks: updatedTasks });
      setNewTask("");
      toast.success("Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      toast.error("Failed to add task.");
    }
  };

  const handleDeleteTask = async (index) => {
    if (!selectedUser) return;
    const updatedTasks = selectedUser.tasks.filter((_, i) => i !== index);

    try {
      await update(ref(db, `users/employers/${selectedUser.nameKey}`), {
        ...selectedUser,
        tasks: updatedTasks,
      });

      setSelectedUser({ ...selectedUser, tasks: updatedTasks });
      toast.info("Task deleted.");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center p-4">
      <h4 className="text-white mb-3">Departments</h4>

      <div>
        {departments.map((dept) => (
          <Button
            key={dept}
            variant={selectedDepartment === dept ? "contained" : "outlined"}
            onClick={() => fetchUsersByDepartment(dept)}
            sx={{
              margin: "5px",
              color: "black", 
              backgroundColor: "white",
              "&:hover": { backgroundColor: "#f0f0f0" },
              border: "1px solid #ccc",
            }}
          >
            {dept}
          </Button>
        ))}
      </div>

      {selectedDepartment && (
        <TextField
          label="Search User"
          variant="standard"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            mb: 2,
            border: "1px solid #ccc", 
            "& .MuiInputBase-input": { color: "black" },
            "& .MuiInput-underline:before, & .MuiInput-underline:after": {
              borderBottom: "none",
            },
          }}
        />
      )}

      <div className="w-100">
        {selectedDepartment && loading ? (
          <CircularProgress />
        ) : (
          <>
            <h5 className="text-light">{selectedDepartment} Department</h5>
            {filteredUsers.length > 0 ? (
              <ul className="list-group">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="list-group-item p-2 border rounded shadow-sm my-2"
                    onClick={() => handleUserClick(user)}
                    style={{ cursor: "pointer" }}
                  >
                    <strong>{user.name}</strong> - {user.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white">No users found in this department.</p>
            )}
          </>
        )}
      </div>

      {/* ✅ Selected User Task Management */}
      {selectedUser && (
        <div className="mt-4 w-100">
          <h5 className="text-light" style={{color:"black"}}>Tasks for {selectedUser.name}</h5>

          <TextField
            label="New Task"
            variant="standard"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              mt: 2,
              border: "1px solid #ccc", 
              "& .MuiInputBase-input": { color: "black" },
              "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                borderBottom: "none",
              },
            }}
          />

          <Button onClick={handleAddTask} variant="contained" sx={{ mt: 2 }}>
            Add Task
          </Button>

          {selectedUser.tasks && selectedUser.tasks.length > 0 && (
            <ul className="list-group mt-3">
              {selectedUser.tasks.map((task, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ color: "black" }} 
                >
                  {task}
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Departments;

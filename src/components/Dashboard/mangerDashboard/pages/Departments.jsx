// import React, { useState, useEffect } from "react";
// import { db } from "../../../../fbconfig";
// import { ref, get, update } from "firebase/database";
// import {
//   Button,
//   TextField,
//   CircularProgress,
// } from "@mui/material";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Departments = () => {
//   const [selectedDepartment, setSelectedDepartment] = useState("");
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newTask, setNewTask] = useState("");
//   const [loading, setLoading] = useState(false);

//   const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];

//   const fetchUsersByDepartment = async (department) => {
//     setSelectedDepartment(department);
//     setSearchQuery("");
//     setSelectedUser(null);
//     setLoading(true);

//     try {
//       const usersRef = ref(db, "users/employers");
//       const snapshot = await get(usersRef);

//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const departmentUsers = Object.keys(data)
//           .map((key) => ({ nameKey: key, ...data[key] }))
//           .filter((user) => user.department === department);

//         setUsers(departmentUsers);
//         setFilteredUsers(departmentUsers);
//       } else {
//         setUsers([]);
//         setFilteredUsers([]);
//       }
//     } catch (error) {
//       console.error("Error fetching department users:", error);
//       toast.error("Failed to fetch users.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = users.filter((user) =>
//       user.name.toLowerCase().includes(query)
//     );
//     setFilteredUsers(filtered);
//   };

//   const handleUserClick = (user) => {
//     setSelectedUser(user);
//   };

//   const handleAddTask = async () => {
//     if (!newTask.trim() || !selectedUser) {
//       toast.warn("Please enter a task and select a user.");
//       return;
//     }

//     const updatedTasks = selectedUser.tasks
//       ? [...selectedUser.tasks, newTask]
//       : [newTask];

//     try {
//       await update(ref(db, `users/employers/${selectedUser.nameKey}`), {
//         ...selectedUser,
//         tasks: updatedTasks,
//       });

//       setSelectedUser({ ...selectedUser, tasks: updatedTasks });
//       setNewTask("");
//       toast.success("Task added successfully!");
//     } catch (error) {
//       console.error("Error adding task:", error);
//       toast.error("Failed to add task.");
//     }
//   };

//   const handleDeleteTask = async (index) => {
//     if (!selectedUser) return;
//     const updatedTasks = selectedUser.tasks.filter((_, i) => i !== index);

//     try {
//       await update(ref(db, `users/employers/${selectedUser.nameKey}`), {
//         ...selectedUser,
//         tasks: updatedTasks,
//       });

//       setSelectedUser({ ...selectedUser, tasks: updatedTasks });
//       toast.info("Task deleted.");
//     } catch (error) {
//       console.error("Error deleting task:", error);
//       toast.error("Failed to delete task.");
//     }
//   };

//   return (
//     <div className="d-flex flex-column align-items-center p-4">
//       <h4 className="text-white mb-3">Departments</h4>

//       <div>
//         {departments.map((dept) => (
//           <Button
//             key={dept}
//             variant={selectedDepartment === dept ? "contained" : "outlined"}
//             onClick={() => fetchUsersByDepartment(dept)}
//             sx={{
//               margin: "5px",
//               color: "black", 
//               backgroundColor: "white",
//               "&:hover": { backgroundColor: "#f0f0f0" },
//               border: "1px solid #ccc",
//             }}
//           >
//             {dept}
//           </Button>
//         ))}
//       </div>

//       {selectedDepartment && (
//         <TextField
//           label="Search User"
//           variant="standard"
//           fullWidth
//           value={searchQuery}
//           onChange={handleSearch}
//           sx={{
//             backgroundColor: "white",
//             borderRadius: "5px",
//             mb: 2,
//             border: "1px solid #ccc", 
//             "& .MuiInputBase-input": { color: "black" },
//             "& .MuiInput-underline:before, & .MuiInput-underline:after": {
//               borderBottom: "none",
//             },
//           }}
//         />
//       )}

//       <div className="w-100">
//         {selectedDepartment && loading ? (
//           <CircularProgress />
//         ) : (
//           <>
//             <h5 className="text-light">{selectedDepartment} Department</h5>
//             {filteredUsers.length > 0 ? (
//               <ul className="list-group">
//                 {filteredUsers.map((user) => (
//                   <li
//                     key={user.id}
//                     className="list-group-item p-2 border rounded shadow-sm my-2"
//                     onClick={() => handleUserClick(user)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <strong>{user.name}</strong> - {user.email}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-white">No users found in this department.</p>
//             )}
//           </>
//         )}
//       </div>

//       {/* ✅ Selected User Task Management */}
//       {selectedUser && (
//         <div className="mt-4 w-100">
//           <h5 className="text-light" style={{color:"black"}}>Tasks for {selectedUser.name}</h5>

//           <TextField
//             label="New Task"
//             variant="standard"
//             fullWidth
//             value={newTask}
//             onChange={(e) => setNewTask(e.target.value)}
//             sx={{
//               backgroundColor: "white",
//               borderRadius: "5px",
//               mt: 2,
//               border: "1px solid #ccc", 
//               "& .MuiInputBase-input": { color: "black" },
//               "& .MuiInput-underline:before, & .MuiInput-underline:after": {
//                 borderBottom: "none",
//               },
//             }}
//           />

//           <Button onClick={handleAddTask} variant="contained" sx={{ mt: 2 }}>
//             Add Task
//           </Button>

//           {selectedUser.tasks && selectedUser.tasks.length > 0 && (
//             <ul className="list-group mt-3">
//               {selectedUser.tasks.map((task, index) => (
//                 <li
//                   key={index}
//                   className="list-group-item d-flex justify-content-between align-items-center"
//                   style={{ color: "black" }} 
//                 >
//                   {task}
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     size="small"
//                     onClick={() => handleDeleteTask(index)}
//                   >
//                     Delete
//                   </Button>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Departments;


import React, { useState, useEffect } from "react";
import { db } from "../../../../fbconfig";
import { ref, get, update } from "firebase/database";
import {
  Button,
  TextField,
  CircularProgress,
  Avatar,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deepPurple, blue, green, pink, orange } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';

// Generate consistent color for avatars based on the user's name/email
const getColor = (str) => {
  const colors = [blue[500], green[500], pink[500], orange[500], deepPurple[500]];
  if (!str || typeof str !== 'string') return colors[0];  // Default to the first color if not a valid string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

// Get initials from name
const getInitials = (name) => {
  if (!name) return "E";
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

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
      <Typography variant="h4" className="mb-3" color="balck">Departments</Typography>

      <Grid container spacing={2} justifyContent="center" className="mb-4">
        {departments.map((dept) => (
          <Grid item key={dept}>
            <Button
              variant={selectedDepartment === dept ? "contained" : "outlined"}
              onClick={() => fetchUsersByDepartment(dept)}
              sx={{
                color: "black",
                backgroundColor: selectedDepartment === dept ? "#e8eaf6" : "white", 
                "&:hover": { backgroundColor: selectedDepartment === dept ? "#c5cae9" : "#f0f0f0" },
                border: "1px solid #ccc",
              }}
            >
              {dept}
            </Button>
          </Grid>
        ))}
      </Grid>

      {selectedDepartment && (
        <TextField
          label="Search User"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            mb: 2,
            border: "1px solid #ccc", 
            "& .MuiInputBase-input": { color: "black" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "1px solid #ccc", 
              },
              "&:hover fieldset": {
                border: "1px solid #aaa", 
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #888", 
              },
            },
          }}
        />
      )}

      <div className="w-100">
        {selectedDepartment && loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h5" className="text-light" color="black !important">
              {selectedDepartment} Department
            </Typography>
            {filteredUsers.length > 0 ? (
              <Grid container spacing={2}>
                {filteredUsers.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <Card
                      onClick={() => handleUserClick(user)}
                      sx={{ cursor: "pointer", boxShadow: 2, transition: "transform 0.3s" }}
                      className="shadow-sm"
                    >
                      <CardContent>
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            sx={{
                              bgcolor: getColor(user.name || user.email),
                              width: 56,
                              height: 56,
                              fontWeight: "bold",
                            }}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <div>
                            <Typography variant="subtitle1" className="text-dark">{user.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{user.email}</Typography>
                          </div>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2" color="textSecondary" className="mt-3">No users found in this department.</Typography>
            )}
          </>
        )}
      </div>

      {/* Task Management Section */}
      {selectedUser && (
        <div className="mt-4 w-100">
          <Typography variant="h6" className="text-dark" style={{ color: "black !important" }}>
            Tasks for {selectedUser.name}
          </Typography>

          <TextField
            label="New Task"
            fullWidth
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              mt: 2,
              border: "1px solid #ccc", 
              "& .MuiInputBase-input": { color: "black" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "1px solid #ccc", 
                },
                "&:hover fieldset": {
                  border: "1px solid #aaa", 
                },
                "&.Mui-focused fieldset": {
                  border: "1px solid #888", 
                },
              },
            }}
          />

          <Button
            onClick={handleAddTask}
            variant="contained"
            sx={{ mt: 2 }}
            disabled={!newTask.trim()}
          >
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
                  <Typography variant="body2">{task}</Typography>
                  <IconButton color="error" onClick={() => handleDeleteTask(index)}>
                    <DeleteIcon />
                  </IconButton>
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



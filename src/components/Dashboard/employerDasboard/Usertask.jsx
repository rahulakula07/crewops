import React, { useEffect, useState } from "react";
import {Container,Paper,Typography,Grid,Card,Skeleton,Select,MenuItem,} from "@mui/material";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const employersRef = ref(db, "users/employers");

      onValue(employersRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const userData = Object.values(data).find(
            (employer) => employer.id === user.uid
          );

          if (userData && userData.tasks) {
            const taskData = userData.tasks;

            if (Array.isArray(taskData)) {
              setTasks(
                taskData.map((task, index) =>
                  typeof task === "string"
                    ? { id: index, title: task, status: "" }
                    : { id: index, ...task }
                )
              );
            } else {
              const taskList = Object.entries(taskData).map(([id, task]) => ({
                id,
                ...task,
              }));
              setTasks(taskList);
            }
            setIsLoading(false);
          } else {
            setTasks([]);
            setIsLoading(false);
          }
        } else {
          setTasks([]);
          setIsLoading(false);
        }
      });
    }
  }, []);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleStatusBlur = (taskId, status) => {
    const user = auth.currentUser;
    if (!user) return;

    const taskRef = ref(db, `users/employers/${user.uid}/tasks/${taskId}`);
    update(taskRef, { status });
    setSelectedTaskId(null);
  };

  const handleTaskClick = (taskId) => {
    setSelectedTaskId(taskId);
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: 20, marginTop: 30 }}>
        <Typography variant="h5" gutterBottom>
          My Tasks
        </Typography>

        {isLoading ? (
          <Grid container spacing={2}>
            {new Array(6).fill(0).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Skeleton variant="text" width="80%" height={28} />
                  <Skeleton variant="text" width="60%" />
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : tasks.length === 0 ? (
          <Typography>No tasks assigned.</Typography>
        ) : (
          <Grid container spacing={2}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderColor:
                      selectedTaskId === task.id ? "#7C3AED" : "divider",
                    backgroundColor:
                      selectedTaskId === task.id
                        ? "#f3f4f6"
                        : "background.paper",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 3,
                    },
                  }}
                  onClick={() => handleTaskClick(task.id)}
                >
                  <Typography variant="h6" gutterBottom>
                    {task.title}
                  </Typography>
                  {selectedTaskId === task.id ? (
                    <Select
                      fullWidth
                      value={task.status || ""}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                      onBlur={() => handleStatusBlur(task.id, task.status)}
                      autoFocus
                      variant="standard"
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Status: <strong>{task.status || "Not set"}</strong>
                    </Typography>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default UserTasks;

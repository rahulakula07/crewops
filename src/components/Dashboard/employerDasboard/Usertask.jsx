import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
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
          } else {
            setTasks([]);
          }
        } else {
          setTasks([]);
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
    setSelectedTaskId(null); // hide input after saving
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
        {tasks.length === 0 ? (
          <Typography>No tasks assigned.</Typography>
        ) : (
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                style={{ display: "block", cursor: "pointer" }}
                onClick={() => handleTaskClick(task.id)}
              >
                <ListItemText
                  primary={task.title}
                  secondary={
                    selectedTaskId === task.id
                      ? null
                      : `Status: ${task.status || "Not set"}`
                  }
                />
                {selectedTaskId === task.id && (
                  <TextField
                    autoFocus
                    placeholder="Enter status"
                    value={task.status || ""}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                    onBlur={() => handleStatusBlur(task.id, task.status)}
                    fullWidth
                    variant="standard"
                  />
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default UserTasks;

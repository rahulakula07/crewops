import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { ref, get, remove } from "firebase/database";
import { db } from "../../../../fbconfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./leave.css"

const Leave = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const managerUid = "7inDJHenyPVtaxtJ3p37IpveinU2"; 

  useEffect(() => {
    const fetchLeaveApplications = async () => {
      try {
        const leaveApplicationsRef = ref(
          db,
          `managers/${managerUid}/leaveApplications`
        );
        const snapshot = await get(leaveApplicationsRef);

        if (snapshot.exists()) {
          const applications = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          setLeaveApplications(applications);
        } else {
          console.log("No leave applications found.");
        }
      } catch (error) {
        console.error("Error fetching leave applications:", error);
        toast.error("Failed to fetch leave applications.");
      }
    };

    fetchLeaveApplications();
  }, []);

  const handleAccept = async (leaveId) => {
    try {
      const leaveRef = ref(
        db,
        `managers/${managerUid}/leaveApplications/${leaveId}`
      );
      await remove(leaveRef);
      toast.success("Leave accepted!");
      setLeaveApplications((prev) =>
        prev.filter((leave) => leave.id !== leaveId)
      );
    } catch (error) {
      console.error("Error accepting leave:", error);
      toast.error("Failed to accept leave.");
    }
  };

  const handleReject = async (leaveId) => {
    try {
      const leaveRef = ref(
        db,
        `managers/${managerUid}/leaveApplications/${leaveId}`
      );
      await remove(leaveRef);
      toast.info("Leave rejected.");
      setLeaveApplications((prev) =>
        prev.filter((leave) => leave.id !== leaveId)
      );
    } catch (error) {
      console.error("Error rejecting leave:", error);
      toast.error("Failed to reject leave.");
    }
  };

  const handleOpenModal = (leave) => {
    setSelectedLeave(leave);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedLeave(null);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        fontFamily: "Roboto",
        px: {
          xs: 2,
          sm: 3,
          md: 5,
          lg: 8,
        },
        pt: 4,
      }}
    >
      <Grid container spacing={3}>
        {leaveApplications.length === 0 ? (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, fontFamily: "Roboto" }}>
              <Typography variant="h6" align="center">
                No Leave Applications Available
              </Typography>
            </Paper>
          </Grid>
        ) : (
          leaveApplications.map((leave) => (
            <Grid item xs={12} sm={6} md={5} key={leave.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
                  },
                  bgcolor: "background.paper",
                  height: {
                    xs: "auto",
                    sm: 260,
                    md: 280,
                    lg: 300,
                  },
                }}
              >
                <Box sx={{ mb: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      fontSize: {
                        xs: "1.1rem",
                        sm: "1.2rem",
                      },
                    }}
                  >
                    {leave.userName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: {
                        xs: "0.85rem",
                      },
                    }}
                  >
                    {leave.userEmail}
                  </Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>From:</strong>{" "}
                    {new Date(leave.from).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    <strong>To:</strong>{" "}
                    {new Date(leave.to).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Reason:</strong>{" "}
                    {leave.reason.length > 24
                      ? `${leave.reason.slice(0, 22)}...`
                      : leave.reason}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    mt: 2,
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => handleAccept(leave.id)}
                    sx={{ textTransform: "capitalize", flex: 1 }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleReject(leave.id)}
                    sx={{ textTransform: "capitalize", flex: 1 }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleOpenModal(leave)}
                    sx={{ textTransform: "capitalize", flex: 1 }}
                  >
                    View
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      {/* Modal for Viewing Full Leave Details */}
      <Modal open={open} onClose={handleCloseModal}>
        <Paper
          sx={{
            fontFamily: "Roboto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "90%",
              sm: 400,
              md: 500,
            },
            p: 4,
            outline: "none",
            maxHeight: "80vh", // To prevent it from being too tall
            overflow: "auto", // Enables scrolling if content overflows
          }}
        >
          <Typography variant="h6" gutterBottom>
            Leave Application Details
          </Typography>
          {selectedLeave && (
            <>
              <Typography variant="body1">
                <strong>Name:</strong> {selectedLeave.userName}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {selectedLeave.userEmail}
              </Typography>
              <Typography variant="body1">
                <strong>From:</strong> {new Date(selectedLeave.from).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>To:</strong> {new Date(selectedLeave.to).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                <strong>Reason:</strong> {selectedLeave.reason}
              </Typography>
            </>
          )}
          <Box sx={{ mt: 2, textAlign: "right" }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Close
            </Button>
          </Box>
        </Paper>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Leave;

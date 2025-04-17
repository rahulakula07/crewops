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

const Leave = () => {
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const managerUid = "7inDJHenyPVtaxtJ3p37IpveinU2"; // Replace with actual logic

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
            <Grid item xs={12} sm={6} md={4} key={leave.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "Roboto",
                  minHeight: {
                    xs: "auto",
                    sm: 240,
                    md: 260,
                    lg: 280,
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: {
                      xs: "1rem",
                      sm: "1.1rem",
                      md: "1.2rem",
                      lg: "1.3rem",
                    },
                  }}
                >
                  {leave.userName}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    fontSize: {
                      xs: "0.8rem",
                      sm: "0.85rem",
                    },
                  }}
                >
                  {leave.userEmail}
                </Typography>
                <Typography variant="body1">
                  From: {new Date(leave.from).toLocaleDateString()} <br />
                  To: {new Date(leave.to).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">Reason: {leave.reason}</Typography>
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
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.75rem",
                      },
                      px: {
                        xs: 1,
                        sm: 2,
                      },
                    }}
                    onClick={() => handleAccept(leave.id)}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.75rem",
                      },
                      px: {
                        xs: 1,
                        sm: 2,
                      },
                    }}
                    onClick={() => handleReject(leave.id)}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      fontSize: {
                        xs: "0.7rem",
                        sm: "0.75rem",
                      },
                    }}
                    onClick={() => handleOpenModal(leave)}
                  >
                    View
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      {/* Modal */}
      {selectedLeave && (
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
            }}
          >
            <Typography variant="h6" gutterBottom>
              Leave Application Details
            </Typography>
            <Typography variant="body1">
              Name: {selectedLeave.userName}
            </Typography>
            <Typography variant="body1">
              Email: {selectedLeave.userEmail}
            </Typography>
            <Typography variant="body1">
              From: {new Date(selectedLeave.from).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              To: {new Date(selectedLeave.to).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">
              Reason: {selectedLeave.reason}
            </Typography>
            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Button variant="outlined" onClick={handleCloseModal}>
                Close
              </Button>
            </Box>
          </Paper>
        </Modal>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
};

export default Leave;

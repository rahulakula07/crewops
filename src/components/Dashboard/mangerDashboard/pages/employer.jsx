import React, { useState, useEffect } from "react";
import { db } from "../../../../fbconfig";
import { ref, get, remove } from "firebase/database";
import {
  Avatar,
  Badge,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Button,
} from "@mui/material";
import { deepPurple, blue, green, pink, orange } from "@mui/material/colors";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Generate consistent color
const getColor = (str) => {
  const colors = [blue[500], green[500], pink[500], orange[500], deepPurple[500]];
  if (!str || typeof str !== 'string') return colors[0];
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

const Employer = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEls, setAnchorEls] = useState({});
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const employersRef = ref(db, "users/employers");
        const snapshot = await get(employersRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const employersList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setEmployers(employersList);
        } else {
          setEmployers([]);
        }
      } catch (error) {
        console.error("Error fetching employers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployers();
  }, []);

  const tableActionData = [
    { icon: "solar:eye-bold", listtitle: "View" },
    { icon: "solar:trash-bin-minimalistic-outline", listtitle: "Delete" },
  ];

  const handleMenuOpen = (event, id) => {
    setAnchorEls({ ...anchorEls, [id]: event.currentTarget });
  };

  const handleMenuClose = (id) => {
    setAnchorEls({ ...anchorEls, [id]: null });
  };

  const handleActionClick = (action, employer) => {
    if (action.listtitle === "View") {
      setSelectedEmployer(employer);
      setIsModalOpen(true);
    } else if (action.listtitle === "Delete") {
      if (window.confirm(`Are you sure you want to delete ${employer.name}?`)) {
        const employerRef = ref(db, `users/employers/${employer.id}`);
        remove(employerRef)
          .then(() => {
            toast.success("Employer deleted successfully");
            setEmployers((prev) => prev.filter((e) => e.id !== employer.id));
          })
          .catch((err) => {
            console.error(err);
            toast.error("Error deleting employer");
          });
      }
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "#fff", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Employers
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            ) : employers.length > 0 ? (
              employers.map((employer) => (
                <TableRow key={employer.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        sx={{
                          bgcolor: getColor(employer.name || employer.email),
                          width: 48,
                          height: 48,
                          fontWeight: "bold",
                        }}
                      >
                        {getInitials(employer.name)}
                      </Avatar>
                      <Typography variant="subtitle2">{employer.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{employer.email}</TableCell>
                  <TableCell>
                    <Badge
                      badgeContent="Active"
                      color="success"
                      sx={{ "& .MuiBadge-badge": { right: -16 } }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => handleMenuOpen(e, employer.id)}>
                      <HiOutlineDotsVertical />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEls[employer.id]}
                      open={Boolean(anchorEls[employer.id])}
                      onClose={() => handleMenuClose(employer.id)}
                    >
                      {tableActionData.map((action, idx) => (
                        <MenuItem
                          key={idx}
                          onClick={() => {
                            handleActionClick(action, employer);
                            handleMenuClose(employer.id);
                          }}
                        >
                          <Icon icon={action.icon} style={{ marginRight: 8 }} />
                          {action.listtitle}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No employers found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedEmployer && (
            <>
              <Typography variant="h6" gutterBottom>
                Employer Details
              </Typography>
              <Typography><strong>Name:</strong> {selectedEmployer.name}</Typography>
              <Typography><strong>Email:</strong> {selectedEmployer.email}</Typography>
              <Box textAlign="right" mt={2}>
                <Button onClick={() => setIsModalOpen(false)} variant="contained" color="primary">
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default Employer;




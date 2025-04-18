// import React, { useState } from 'react';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from '@mui/material';
// import {
//   AccessTime,
//   BusinessCenter,
//   AttachMoney,
//   Send,
// } from '@mui/icons-material';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';

// const taskData = [
//   { name: 'Task 1', progress: 80 },
//   { name: 'Task 2', progress: 55 },
//   { name: 'Task 3', progress: 30 },
// ];

// const InfoCard = ({ icon, label, value, color }) => (
//   <Card sx={{ backgroundColor: color, color: 'white', borderRadius: 2, boxShadow: 3 }}>
//     <CardContent>
//       <Box display="flex" alignItems="center" gap={1}>
//         {icon}
//         <Typography variant="h6">{label}</Typography>
//       </Box>
//       <Typography variant="h4" fontWeight="bold" mt={1}>
//         {value}
//       </Typography>
//     </CardContent>
//   </Card>
// );

// const UserDashboard = () => {
//   const [open, setOpen] = useState(false);
//   const [leaveData, setLeaveData] = useState({
//     from: '',
//     to: '',
//     reason: '',
//   });

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleChange = (e) => {
//     setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
//   };

//   const handleApplyLeave = () => {
//     console.log('Leave Application:', leaveData);
//     handleClose();
//   };

//   return (
//     <Box p={4}>
//       {/* Top Info Cards */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={3}>
//           <InfoCard
//             icon={<AccessTime />}
//             label="Attendance Today"
//             value="Present"
//             color="#4caf50"
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <InfoCard
//             icon={<BusinessCenter />}
//             label="Pending Tasks"
//             value="3"
//             color="#f44336"
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <InfoCard
//             icon={<AttachMoney />}
//             label="Leave Balance"
//             value="10 Days"
//             color="#ff9800"
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Card
//             sx={{
//               backgroundColor: '#2196f3',
//               color: 'white',
//               borderRadius: 2,
//               height: '100%',
//               boxShadow: 3,
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6">Request Leave</Typography>
//               <Button
//                 variant="outlined"
//                 endIcon={<Send />}
//                 sx={{ mt: 1, borderColor: 'white', color: 'white' }}
//                 onClick={handleOpen}
//               >
//                 Apply
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Chart */}
//       <Box mt={5}>
//         <Card sx={{ boxShadow: 3 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Task Progress
//             </Typography>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={taskData} barCategoryGap="20%" barSize={40}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="progress" fill="#1976d2" radius={[5, 5, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Leave Request Modal */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle fontWeight="bold">Apply for Leave</DialogTitle>
//         <DialogContent dividers>
//           <TextField
//             fullWidth
//             margin="dense"
//             label="From Date"
//             type="date"
//             name="from"
//             required
//             value={leaveData.from}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="To Date"
//             type="date"
//             name="to"
//             required
//             value={leaveData.to}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Reason"
//             name="reason"
//             multiline
//             rows={4}
//             placeholder="Briefly describe your reason for leave..."
//             required
//             value={leaveData.reason}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 2 }}>
//           <Button onClick={handleClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleApplyLeave} variant="contained">
//             Apply Leave
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default UserDashboard;




// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Box,
//   Button,
//   TextField,
//   Modal,
//   Skeleton,
// } from "@mui/material";
// import { ref, push } from "firebase/database";
// import { db } from "../../../fbconfig";
// import { getAuth } from "firebase/auth";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import ScheduleIcon from "@mui/icons-material/Schedule";
// import WorkIcon from "@mui/icons-material/Work";
// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const UserDashboard = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [leaveForm, setLeaveForm] = useState({
//     from: "",
//     to: "",
//     reason: "",
//   });
//   const [user, setUser] = useState(null);

//   const managerUid = "7inDJHenyPVtaxtJ3p37IpveinU2"; // Replace with actual logic

//   const stats = [
//     {
//       title: "Attendance Today",
//       value: "Present",
//       icon: <ScheduleIcon />,
//       color: "#32CD32",
//     },
//     {
//       title: "Pending Tasks",
//       value: 3,
//       icon: <WorkIcon />,
//       color: "#FF6347",
//     },
//     {
//       title: "Leave Balance",
//       value: "10 Days",
//       icon: <MonetizationOnIcon />,
//       color: "#FFD700",
//     },
//   ];

//   const taskData = [
//     { name: "Task 1", progress: 80 },
//     { name: "Task 2", progress: 50 },
//     { name: "Task 3", progress: 30 },
//   ];

//   useEffect(() => {
//     const auth = getAuth();
//     const currentUser = auth.currentUser;
//     if (currentUser) {
//       setUser(currentUser);
//     }
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleFormChange = (e) => {
//     setLeaveForm({ ...leaveForm, [e.target.name]: e.target.value });
//   };

//   const handleLeaveSubmit = async () => {
//     if (!user) {
//       toast.error("No user is logged in.");
//       return;
//     }

//     try {
//       const leaveData = {
//         ...leaveForm,
//         userEmail: user.email,
//         userName: user.displayName || user.email.split("@")[0] || "Unknown User",
//         submittedAt: new Date().toISOString(),
//       };

//       const leaveApplicationsRef = ref(
//         db,
//         `managers/${managerUid}/leaveApplications`
//       );

//       await push(leaveApplicationsRef, leaveData);
//       toast.success("Leave request submitted!");
//       setLeaveForm({ from: "", to: "", reason: "" });
//       setOpen(false);
//     } catch (error) {
//       console.error("Error submitting leave:", error);
//       toast.error("Error submitting leave.");
//     }
//   };

//   return (
//     <div className="user-dashboard-container">
//       <Container maxWidth="lg">
//         <Grid container spacing={3}>
//           {/* STATS ROW */}
//           <Grid item xs={12}>
//             <Grid container spacing={3}>
//               {isLoading
//                 ? new Array(3).fill(0).map((_, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                       <Paper
//                         elevation={3}
//                         sx={{
//                           p: 2,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           backgroundColor: "#f0f0f0",
//                         }}
//                       >
//                         <Box>
//                           <Skeleton variant="text" width={120} height={30} />
//                           <Skeleton variant="text" width={60} height={40} />
//                         </Box>
//                         <Skeleton variant="circular" width={40} height={40} />
//                       </Paper>
//                     </Grid>
//                   ))
//                 : stats.map((stat, index) => (
//                     <Grid item xs={12} sm={6} md={4} key={index}>
//                       <Paper
//                         elevation={3}
//                         sx={{
//                           p: 2,
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                           backgroundColor: stat.color,
//                           color: "white",
//                         }}
//                       >
//                         <Box>
//                           <Typography variant="h6">{stat.title}</Typography>
//                           <Typography variant="h4">{stat.value}</Typography>
//                         </Box>
//                         {stat.icon}
//                       </Paper>
//                     </Grid>
//                   ))}
//             </Grid>
//           </Grid>

//           {/* BAR CHART */}
//           <Grid item xs={12}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Task Progress
//               </Typography>
//               <ResponsiveContainer width="100%" height={250}>
//                 <BarChart data={taskData}>
//                   <XAxis dataKey="name" stroke="#8884d8" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="progress" fill="#8884d8" barSize={40} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </Paper>
//           </Grid>

//           {/* APPLY LEAVE SECTION */}
//           <Grid item xs={12}>
//             <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
//               <Typography variant="h6">Request Leave</Typography>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 2 }}
//                 onClick={() => setOpen(true)}
//               >
//                 Apply for Leave
//               </Button>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Container>

//       {/* Modal for Leave Form */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Paper
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             p: 4,
//             outline: "none",
//           }}
//         >
//           <Typography variant="h6" gutterBottom>
//             Leave Application
//           </Typography>
//           <TextField
//             fullWidth
//             type="date"
//             name="from"
//             label="From Date"
//             InputLabelProps={{ shrink: true }}
//             value={leaveForm.from}
//             onChange={handleFormChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             type="date"
//             name="to"
//             label="To Date"
//             InputLabelProps={{ shrink: true }}
//             value={leaveForm.to}
//             onChange={handleFormChange}
//             margin="normal"
//           />
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="Reason"
//             name="reason"
//             value={leaveForm.reason}
//             onChange={handleFormChange}
//             margin="normal"
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "#ccc",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "#aaa",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "transparent",
//                 },
//               },
//               "& .MuiOutlinedInput-root.Mui-focused": {
//                 boxShadow: "none",
//               },
//               "& .MuiInputBase-input": {
//                 outline: "none",
//               },
//             }}
//           />
//           <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "#32CD32",
//                 color: "#fff",
//                 "&:hover": {
//                   backgroundColor: "#28a428",
//                 },
//               }}
//               onClick={handleLeaveSubmit}
//             >
//               Apply Leave
//             </Button>
//           </Box>
//         </Paper>
//       </Modal>

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import {
  AccessTime,
  BusinessCenter,
  AttachMoney,
  Send,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getAuth } from "firebase/auth";
import { ref, push } from "firebase/database";
import { db } from "../../../fbconfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InfoCard = ({ icon, label, value, color }) => (
  <Card
    sx={{
      backgroundColor: color,
      color: "white",
      borderRadius: 2,
      height: "100%",
      boxShadow: 3,
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" gap={2}>
        {icon}
        <Box>
          <Typography variant="h6">{label}</Typography>
          <Typography variant="h5">{value}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const UserDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [leaveData, setLeaveData] = useState({ from: "", to: "", reason: "" });
  const [user, setUser] = useState(null);

  const managerUid = "7inDJHenyPVtaxtJ3p37IpveinU2"; // Replace with actual logic

  const taskData = [
    { name: "Task 1", progress: 80 },
    { name: "Task 2", progress: 50 },
    { name: "Task 3", progress: 30 },
  ];

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  const handleApplyLeave = async () => {
    if (!user) {
      toast.error("No user is logged in.");
      return;
    }

    try {
      const leavePayload = {
        ...leaveData,
        userEmail: user.email,
        userName: user.displayName || user.email.split("@")[0],
        submittedAt: new Date().toISOString(),
      };

      const leaveRef = ref(db, `managers/${managerUid}/leaveApplications`);
      await push(leaveRef, leavePayload);

      toast.success("Leave request submitted!");
      setLeaveData({ from: "", to: "", reason: "" });
      setOpen(false);
    } catch (error) {
      console.error("Error submitting leave:", error);
      toast.error("Error submitting leave.");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box p={4}>
      {/* Top Info Cards */}
      <Grid container spacing={3}>
        {isLoading
          ? new Array(4).fill(0).map((_, idx) => (
              <Grid item xs={12} md={3} key={idx}>
                <Card sx={{ p: 2 }}>
                  <Skeleton variant="text" width={100} height={30} />
                  <Skeleton variant="text" width={60} height={30} />
                </Card>
              </Grid>
            ))
          : <>
              <Grid item xs={12} md={3}>
                <InfoCard
                  icon={<AccessTime />}
                  label="Attendance Today"
                  value="Present"
                  color="#4caf50"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <InfoCard
                  icon={<BusinessCenter />}
                  label="Pending Tasks"
                  value="3"
                  color="#f44336"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <InfoCard
                  icon={<AttachMoney />}
                  label="Leave Balance"
                  value="10 Days"
                  color="#ff9800"
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Card
                  sx={{
                    backgroundColor: "#2196f3",
                    color: "white",
                    borderRadius: 2,
                    height: "100%",
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">Request Leave</Typography>
                    <Button
                      variant="outlined"
                      endIcon={<Send />}
                      sx={{
                        mt: 1,
                        borderColor: "white",
                        color: "white",
                        "&:hover": {
                          borderColor: "#eee",
                        },
                      }}
                      onClick={handleOpen}
                    >
                      Apply
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </>
        }
      </Grid>

      {/* Task Progress Chart */}
      <Box mt={5}>
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Task Progress
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskData} barCategoryGap="20%" barSize={40}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="progress" fill="#1976d2" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Leave Request Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold">Apply for Leave</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="dense"
            label="From Date"
            type="date"
            name="from"
            required
            value={leaveData.from}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="To Date"
            type="date"
            name="to"
            required
            value={leaveData.to}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Reason"
            name="reason"
            multiline
            rows={4}
            placeholder="Briefly describe your reason for leave..."
            required
            value={leaveData.reason}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleApplyLeave} variant="contained">
            Apply Leave
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default UserDashboard;











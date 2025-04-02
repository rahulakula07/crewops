// // import React, { useState } from "react";
// // import { createUserWithEmailAndPassword } from "firebase/auth";
// // import { author, db } from "../../../fbconfig";
// // import { set, ref } from "firebase/database";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "./Signup.css"; // Custom CSS file
// // import { FaUserPlus } from "react-icons/fa";

// // const Signup = () => {
// //   const [signup, setSignup] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     userType: "",
// //   });

// //   const handleDetails = (e) => {
// //     setSignup({ ...signup, [e.target.name]: e.target.value });
// //   };

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     const { name, email, password, userType } = signup;
// //     try {
// //       const signupUser = await createUserWithEmailAndPassword(
// //         author,
// //         email,
// //         password
// //       );
// //       alert("Signup successfully done");
// //       await set(ref(db, "users/" + signupUser.user.uid), {
// //         name: name,
// //         email: email,
// //         userType: userType,
// //         id: signupUser.user.uid,
// //       });
// //     } catch (err) {
// //       console.error(err);
// //       alert("Signup failed. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="signup-container d-flex align-items-center justify-content-center vh-100">
// //       <div className="signup-box p-4 rounded">
// //         <div className="text-center">
// //           <div className="signup-avatar">
// //             <FaUserPlus className="avatar-icon" />
// //           </div>
// //           <h2 className="text-white">Sign Up</h2>
// //         </div>
// //         <form onSubmit={handleSignup}>
// //           <div className="mb-3">
// //             <label className="form-label text-white">Name</label>
// //             <input
// //               type="text"
// //               name="name"
// //               className="form-control input-field"
// //               onChange={handleDetails}
// //               required
// //             />
// //           </div>
// //           <div className="mb-3">
// //             <label className="form-label text-white">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               className="form-control input-field"
// //               onChange={handleDetails}
// //               required
// //             />
// //           </div>
// //           <div className="mb-3">
// //             <label className="form-label text-white">Password</label>
// //             <input
// //               type="password"
// //               name="password"
// //               className="form-control input-field"
// //               onChange={handleDetails}
// //               required
// //             />
// //           </div>
// //           <div className="mb-3">
// //             <label className="form-label text-white">User Type</label>
// //             <select
// //               name="userType"
// //               className="form-select input-field"
// //               onChange={handleDetails}
// //               required
// //             >
// //               <option value="" disabled selected>
// //                 Select User Type
// //               </option>
// //               <option value="manager">Manager</option>
// //               <option value="employer">Employer</option>
// //             </select>
// //           </div>
// //           <button type="submit" className="btn signup-button w-100">
// //             Sign Up
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Signup;




// import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { author, db } from "../../../fbconfig";
// import { set, ref } from "firebase/database";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Avatar,
//   CssBaseline,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";

// const Signup = () => {
//   const [signup, setSignup] = useState({
//     name: "",
//     email: "",
//     password: "",
//     userType: "",
//   });

//   const handleDetails = (e) => {
//     setSignup({ ...signup, [e.target.name]: e.target.value });
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const { name, email, password, userType } = signup;
//     try {
//       const signupUser = await createUserWithEmailAndPassword(
//         author,
//         email,
//         password
//       );
//       alert("Signup successfully done");
//       const userCategory = userType.toLowerCase() === "manager" ? "managers" : "employers";
//       if (userType==="manager"){
//         await set(ref(db, `users/${userCategory}/${name}`), {
//           name: name,
//           email: email,
//           userType: userType,
//           id: signupUser.user.uid,
//         });
//       }else{
//         await set(ref(db, `users/${userCategory}/${name}`), {
//           name: name,
//           email: email,
//           userType: userType,
//           id: signupUser.user.uid,
//         });
//       }
      
//     } catch (err) {
//       console.error(err);
//       alert("Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="signup-container">
//       <Container
//         className="signup-box"
//         component="main"
//         maxWidth="xs"
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           backgroundColor: "#111",
//           padding: 4,
//           borderRadius: 3, 
//           // border: "2px solid #7B43A1",
//         }}
//       >
//         <CssBaseline />
//         <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//           <Avatar className="signup-avatar">
//             <PersonAddIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5" color="white">
//             Sign Up
//           </Typography>
//           <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
//             <TextField
//               fullWidth
//               label="Name"
//               name="name"
//               type="text"
//               variant="standard"
//               margin="normal"
//               onChange={handleDetails}
//               required
//               sx={{
//                 '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' },
//                 '& input': { color: 'white' }
//               }}
//             />
//             <TextField
//               fullWidth
//               label="Email"
//               name="email"
//               type="email"
//               variant="standard"
//               margin="normal"
//               onChange={handleDetails}
//               required
//               sx={{
//                 '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' },
//                 '& input': { color: 'white' }
//               }}
//             />
//             <TextField
//               fullWidth
//               label="Password"
//               name="password"
//               type="password"
//               variant="standard"
//               margin="normal"
//               onChange={handleDetails}
//               required
//               sx={{
//                 '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' },
//                 '& input': { color: 'white' }
//               }}
//             />
//             <FormControl fullWidth margin="normal" variant="standard" sx={{ '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' } }}>
//               <InputLabel sx={{ color: 'white' }}>User Type</InputLabel>
//               <Select
//                 name="userType"
//                 value={signup.userType}
//                 onChange={handleDetails}
//                 required
//                 sx={{ color: 'white' }}
//               >
//                 <MenuItem value="manager">Manager</MenuItem>
//                 <MenuItem value="employer">Employer</MenuItem>
//               </Select>
//             </FormControl>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               className="signup-button"
//               sx={{ mt: 2, mb: 2 }}
//             >
//               Sign Up
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { author, db } from "../../../fbconfig";
import { set, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  CssBaseline,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";


const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    department: "",
  });

  const navigate=useNavigate()

  const handleDetails = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, userType, department } = signup;
    try {
      const signupUser = await createUserWithEmailAndPassword(
        author,
        email,
        password
      );
      alert("Signup successfully done");
      navigate("/Login")
      


      const userCategory =
        userType.toLowerCase() === "manager" ? "managers" : "employers";

      await set(ref(db, `users/${userCategory}/${name}`), {
        name: name,
        email: email,
        userType: userType,
        department: department,
        id: signupUser.user.uid,
      });
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
      
    }
  };

  return (
    <div className="signup-container">
      <Container
        className="signup-box"
        component="main"
        maxWidth="xs"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#111",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <CssBaseline />
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar className="signup-avatar">
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="white">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              type="text"
              variant="standard"
              margin="normal"
              onChange={handleDetails}
              required
              sx={{
                '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' },
                '& input': { color: 'white' }
              }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="standard"
              margin="normal"
              onChange={handleDetails}
              required
              sx={{
                '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' },
                '& input': { color: 'white' }
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="standard"
              margin="normal"
              onChange={handleDetails}
              required
              sx={{
                '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' },
                '& input': { color: 'white' }
              }}
            />
            <FormControl fullWidth margin="normal" variant="standard" sx={{ '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' } }}>
              <InputLabel sx={{ color: 'white' }}>User Type</InputLabel>
              <Select
                name="userType"
                value={signup.userType}
                onChange={handleDetails}
                required
                sx={{ color: 'white' }}
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="employer">Employer</MenuItem>
              </Select>
            </FormControl>

            {/* Department Dropdown */}
            <FormControl fullWidth margin="normal" variant="standard" sx={{ '& .MuiInput-underline:after': { borderBottomColor: '#7B43A1' } }}>
              <InputLabel sx={{ color: 'white' }}>Department</InputLabel>
              <Select
                name="department"
                value={signup.department}
                onChange={handleDetails}
                required
                sx={{ color: 'white' }}
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="signup-button"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;

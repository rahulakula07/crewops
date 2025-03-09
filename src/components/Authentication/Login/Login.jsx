// import React, { useState } from 'react'
// import {Form,Button} from "react-bootstrap"
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import { author } from '../../fbconfig'

// function Login() {
//     const [login,setLogin]=useState({
//         emali:"",
//         password:""
//     })
//    const handleDetails=(e)=>{
//     setLogin({...login,[e.target.name]:e.target.value})
//    }
//     const handleLogin=async(e)=>{
//         e.preventDefault()
//         const{email,password}=login
//         try{
//             await signInWithEmailAndPassword(author,email,password)
//             alert("loggedin succesfully")
//         }catch(err){
//             console.log(err);
            
//         }
//     }
//   return (
//     <div>
//       <Form onSubmit={handleLogin}>
//       <Form.Group>
//             <Form.Label>Email</Form.Label >
//                 <Form.Control name="email" type="email"  onChange={handleDetails} ></Form.Control>

//         </Form.Group>
//         <Form.Group>
//         <Form.Label>password</Form.Label >
//             <Form.Control name="password" type="password"  onChange={handleDetails} ></Form.Control>
//     </Form.Group>
//     <Button  type='submit'>Login</Button>
//       </Form>
//     </div>
//   )
// }

// export default Login


import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import './login.css'
import { author } from "../../../fbconfig"; // Ensure auth is correctly imported
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleDetails = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    try {
      await signInWithEmailAndPassword(author, email, password);
      alert("Logged in successfully");
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
      marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 4,
          borderRadius: 3,
          border: "2px solid #ddd", // Add a light border
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
    }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 3, }} >
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            onChange={handleDetails}
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={handleDetails}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

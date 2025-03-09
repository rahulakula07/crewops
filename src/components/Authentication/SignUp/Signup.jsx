// import React, { useState } from 'react'
// import {Form,Button} from "react-bootstrap"
// import {useNavigate} from "react-router-dom"
// import {createUserWithEmailAndPassword} from "firebase/auth"
// import { author,db} from '../../fbconfig'
// import {set,ref} from "firebase/database"

// function Signup() {
//     const navigate=useNavigate()
// const [Signup,setSignup]=useState({
//     name:"",
//     email:"",
//     password:""
// })
//      const handleDetails=(e)=>{
//         setSignup({...Signup,[e.target.name]:e.target.value})
//     }
//      const signSumbit=async(e)=>{
//         e.preventDefault()
//         const {name,email,password}=Signup
//         try{
//             const signupUser= await createUserWithEmailAndPassword(author,email,password)
//             alert("signup successfully done")
//             await set(ref(db,"users/" + name),{
//                 name:name,
//                 email:email,
//                 id:signupUser.user.uid,
//             })
//             navigate("/login")
//         }catch(err){
//             console.log(err)
            
//         }
//      }

//     //  navigate{"/Login"}
//   return (
//     <div>
//       <Form onSubmit={signSumbit}>
//         <Form.Group>
//             <Form.Label>Name</Form.Label >
//                 <Form.Control name="name" type="name" onChange={handleDetails}></Form.Control>

//         </Form.Group>
//         <Form.Group>
//             <Form.Label>Email</Form.Label >
//                 <Form.Control name="email" type="email"  onChange={handleDetails} ></Form.Control>

//         </Form.Group>
//         <Form.Group>
//         <Form.Label>password</Form.Label >
//             <Form.Control name="password" type="password"  onChange={handleDetails} ></Form.Control>
//     </Form.Group>
//     <Button  type='submit'>Signup</Button>
//       </Form>
//     </div>
//   )
// }

// export default Signup



import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { author, db } from "../../../fbconfig";
import { set, ref } from "firebase/database";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  CssBaseline,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleDetails = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signup;
    try {
      const signupUser = await createUserWithEmailAndPassword(
        author,
        email,
        password
      );
      alert("Signup successfully done");
      await set(ref(db, "users/" + name), {
        name: name,
        email: email,
        id: signupUser.user.uid,
      });
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        padding: 4,
        borderRadius: 3,
        border: "2px solid #ddd",
        boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignup} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            type="text"
            variant="outlined"
            margin="normal"
            onChange={handleDetails}
            required
          />
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
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;

import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate=useNavigate()
  return (
    <div>
      <Button onClick={()=>navigate("/Signup")}>Signup</Button>
      <Button onClick={()=>navigate("/Login")}>Login</Button>
    </div>
  )
}

export default Navbar

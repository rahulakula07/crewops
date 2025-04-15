import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { author } from "../../fbconfig";

const AuthRedirect = ({ children }) => {
  const [user, loading] = useAuthState(author);

  if (loading) return <div>Loading...</div>;

  // If user is already logged in, redirect them
  return user ? <Navigate to="/" replace /> : children;
};

export default AuthRedirect;

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { author } from "../../fbconfig";

const AuthRedirect = ({ children }) => {
  const [user, loading] = useAuthState(author);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return user ? (
    <Navigate to={location.state?.from || "/"} replace />
  ) : (
    children
  );
};

export default AuthRedirect;


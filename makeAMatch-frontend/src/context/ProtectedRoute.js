import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust path as needed

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    // User not logged in
    return <Navigate to="/" />;
  } else if (roles && !roles.includes(user.ourUsers.role)) {
    // User does not have the required role
    return <Navigate to="/unauthorize" />;
  }

  return children;
};

export default ProtectedRoute;
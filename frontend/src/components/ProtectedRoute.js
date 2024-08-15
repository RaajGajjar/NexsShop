import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin, isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated() || !isAdmin()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
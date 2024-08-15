import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isClient } from '../utils/auth';

const ClientProtectedRoute = ({ children }) => {
  if (!isAuthenticated() || !isClient()) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ClientProtectedRoute;
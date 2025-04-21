import React from 'react';
import { Navigate } from 'react-router-dom';

const Protectedroute = ({ children, role }) => {
  const isAuthenticated = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('role');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protectedroute;

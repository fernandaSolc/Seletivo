import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

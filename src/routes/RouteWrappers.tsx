/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Navigate } from 'react-router-dom';

//types
import { TProtectedRoute, TPublicdRoute } from 'types';

export const ProtectedRoute = ({ isAuthenticated, children }: TProtectedRoute): any => {
  if (isAuthenticated) return children;

  return <Navigate to="/login" />;
};

export const PublicRoute = ({ isAuthenticated, children }: TPublicdRoute): any => {
  if (isAuthenticated) return <Navigate to="/home" />;

  return children;
};

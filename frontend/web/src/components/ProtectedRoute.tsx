import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('client' | 'attorney' | 'admin')[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/',
}) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required and user's role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on user role
    const roleRedirects: Record<string, string> = {
      client: '/client',
      attorney: '/attorney',
      admin: '/admin',
    };
    
    const redirectPath = roleRedirects[user.role] || redirectTo;
    return <Navigate to={redirectPath} replace />;
  }

  // User is authenticated and has proper role, render children
  return <>{children}</>;
}; 
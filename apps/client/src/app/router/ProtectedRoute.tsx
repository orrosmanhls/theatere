import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  // TODO: replace with authentication logic
  const navigate = useNavigate();
  const isAuthenticated = true;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);
  return children as any;
};

export default ProtectedRoute;

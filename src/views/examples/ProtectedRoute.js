import React from 'react';
import { Navigate,useNavigate  } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('accessToken');
    const navigate =useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
          navigate(-1); 
        }
      }, [isAuthenticated, navigate]);
    
      return !isAuthenticated ? children : null;
};

export default ProtectedRoute;
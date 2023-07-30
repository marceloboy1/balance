// PrivateRoute.js
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem('user');
  const location = useLocation();

  return (
    <Route
      {...rest}
      element={
        isLoggedIn ? (
          children
        ) : (
          <Navigate
            to="/login"
            state={{ from: location }}
            replace={true}
          />
        )
      }
    />
    );
};

export default PrivateRoute;
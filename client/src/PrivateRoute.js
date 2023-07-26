// PrivateRoute.js
import React from 'react';
import { Route, Navigate, useLocation, Routes } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = !!localStorage.getItem('user');
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(isLoggedIn)
  console.log(user)


  return (
    <Routes>
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
    </Routes>
    );
};

export default PrivateRoute;
// Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './Routes/Home';
import LoginPage from './Routes/LoginPage';

function AppRoutes() {
  return (
    <Routes>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default AppRoutes;

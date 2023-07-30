import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, Outlet } from 'react-router-dom';
import Home from './Routes/Home';
import Gastos from './Routes/Gastos';
import Orcamento from './Routes/Orcamento';
import RegisterPage from './Routes/RegisterPage';
import LoginPage from './Routes/LoginPage';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import LandingPage from './Routes/LandingPage';
import UserProvider from './UserProvider';

function PrivateRoute() {
  // Substitua esta linha pelo seu próprio código de autenticação
  const isAuthenticated = !!localStorage.getItem('user');

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

function Layout({ children }) {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/' ;
  
  return (
    <>
      {!hideSidebar && <div><Sidebar /> </div>}
      {children}
    </>
  );
}

function App() {
  
  return (
    <Router>
      <div>
        <Topbar />
        <Layout>
          <UserProvider>
            <Routes>
              
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="/home" element={<PrivateRoute />} >
                <Route path="/home" element={<Home />} />
              </Route>
              <Route path="/gastos" element={<PrivateRoute />} >
                <Route path="/gastos" element={<Gastos />} />
              </Route>
              <Route path="/orcamento" element={<PrivateRoute />} >
                <Route path="/orcamento" element={<Orcamento />} />
              </Route>
              
            </Routes>
          </UserProvider>   
        </Layout>
      </div>
    </Router>
  );
}




export default App;

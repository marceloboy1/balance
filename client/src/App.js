import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, Outlet } from 'react-router-dom';
import Home from './Routes/Home';
import Gastos from './Routes/Gastos';
import Orcamento from './Routes/Orcamento';
import RegisterPage from './Routes/RegisterPage';
import LoginPage from './Routes/LoginPage';

import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div>
        <Topbar />
        <Layout>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/gastos" element={<PrivateRoute />} >
              <Route path="/gastos" element={<Gastos />} />
            </Route>
            <Route path="/orcamento" element={<PrivateRoute />} >
              <Route path="/orcamento" element={<Orcamento />} />
            </Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
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

function PrivateRoute() {
  // Substitua esta linha pelo seu próprio código de autenticação
  const isAuthenticated = !!localStorage.getItem('user');
  console.log(isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default App;

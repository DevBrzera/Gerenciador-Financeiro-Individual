import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { AuthProvider } from './components/login/authContext';
import ProtectedRoute from './components/login/protectedRoute';
import Navbar from "./components/navbar";
import Home from "./components/home";
import Footer from "./components/footer";
import Login from './components/login/login';
import Register from './components/login/register';

import './styles/app.css';

function LayoutWrapper({ children }) {
  const location = useLocation();
  
  const isLoginRoute = location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <>
      {!isLoginRoute && <Navbar />}
      <div className="main-container">
        {children}
      </div>
      {!isLoginRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            {/* Rotas de Login e Cadastro */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rotas Protegidas */}
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

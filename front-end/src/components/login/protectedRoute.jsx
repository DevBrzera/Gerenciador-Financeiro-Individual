import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './authContext';  // Importação nomeada

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  // Verifica se o usuário está autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza as rotas protegidas
  return <Outlet />;
};

export default ProtectedRoute;

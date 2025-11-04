import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../lib/context/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    // Ainda validando autenticação
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-gray-700 text-lg">
          Verificando sessão...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para login
    return <Navigate to="/login" replace />;
  }

  // Se autenticado, renderiza o conteúdo protegido
  return <>{children}</>;
}

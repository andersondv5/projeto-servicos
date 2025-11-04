import { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api";
import type { AuthContextType } from "../types/types";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const login = async (username: string, password: string) => {
    try {
      // SALVA OS TOKENS NO LOCALSTORAGE
      const response = await api.post("/api/token/", { username, password });
      
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      setIsAuthenticated(true);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');  
    } catch (error) {
      throw error;
    } finally {
      setIsAuthenticated(false);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const validateSession = async () => {
      // VERIFICA SE EXISTE TOKEN NO LOCALSTORAGE
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // USA UM ENDPOINT ESPECÍFICO PARA VERIFICAÇÃO
        await api.get("/api/v1/jobs/"); 
        setIsAuthenticated(true);
      } catch (error: any) {
        // SE FALHAR, LIMPA OS TOKENS INVÁLIDOS
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        
        // Redireciona uma única vez, evita múltiplas redireções
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    };
  
    validateSession();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3">Verificando sessão...</span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

//INTERCEPTOR DE REQUEST - Adiciona token no header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// INTERCEPTOR DE RESPONSE - Refresh token com localStorage
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/token/refresh/")
    ) {
      originalRequest._retry = true;

      try {
        // AGORA usa o refresh token do localStorage
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await api.post("/api/token/refresh/", {
          refresh: refreshToken
        });
        
        // Salva o novo access token no localStorage
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        // Atualiza o header da requisição original
        originalRequest.headers.Authorization = `Bearer ${access}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        //Refresh falhou - limpa tokens e redireciona
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
};

export interface Job {
  id: number;
  title: string;
  description: string;
  price: string;
  professional: number;
  category: number;
};

export interface JobFormData {
  title: string;
  description: string;
  price: number;
  category: number;
};

// Tipo de resposta de paginação da API (usado com React Query)
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

// Tipo para autenticação
export interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type LoginFormInputs = {
  username: string;
  password: string;
};
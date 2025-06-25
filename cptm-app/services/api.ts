import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://10.128.0.242:8031/api/v1',
});

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  nome: string;
  email: string;
  telefone: string;
  necessidadeEspecial: string;
  qualNecessidade?: string;
  atendimentoEstacao?: string;
  senha: string;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  necessidadeEspecial: string;
  qualNecessidade?: string;
  atendimentoEstacao?: string;
  is_active: boolean;
  is_superuser: boolean;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface PasswordRecoveryRequest {
  email: string;
}

export interface PasswordResetRequest {
  email: string;
  otp: string;
  new_password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });
    return response.data;
  },

  loginForm: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    const response = await api.post<LoginResponse>('/auth/token', formData);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<User> => {
  const payload = {
    email: credentials.email,
    full_name: credentials.nome,
    telefone: credentials.telefone,
    necessidadeEspecial: credentials.necessidadeEspecial,
    qualNecessidade: credentials.qualNecessidade,
    atendimentoEstacao: credentials.atendimentoEstacao,
    password: credentials.senha,
    is_active: true,
    is_superuser: false
  };

  const response = await api.post('/users/', payload);
  const user = response.data;

  const mappedUser: User = {
    id: user.id,
    nome: user.full_name,
    email: user.email,
    telefone: user.telefone,
    necessidadeEspecial: user.necessidadeEspecial,
    qualNecessidade: user.qualNecessidade,
    atendimentoEstacao: user.atendimentoEstacao,
    is_active: user.is_active,
    is_superuser: user.is_superuser,
  };

  return mappedUser;
},

  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>('/users/');
    return response.data;
  },

  getUserById: async (userId: string): Promise<User> => {
    const response = await api.get<User>(`/users/${userId}/`);
    return response.data;
  },

  updateUser: async (userId: string, userData: Partial<User>): Promise<User> => {
  const payload = {
    email: userData.email,
    full_name: userData.nome,
    telefone: userData.telefone,
    necessidadeEspecial: userData.necessidadeEspecial,
    qualNecessidade: userData.qualNecessidade,
    atendimentoEstacao: userData.atendimentoEstacao,
    is_active: userData.is_active,
    is_superuser: userData.is_superuser,
  };

  const response = await api.put(`/users/${userId}/`, payload);
  const user = response.data;

  const mappedUser: User = {
    id: user.id,
    nome: user.full_name,
    email: user.email,
    telefone: user.telefone,
    necessidadeEspecial: user.necessidadeEspecial,
    qualNecessidade: user.qualNecessidade,
    atendimentoEstacao: user.atendimentoEstacao,
    is_active: user.is_active,
    is_superuser: user.is_superuser,
  };

  return mappedUser;
},

  deleteUser: async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}/`);
  },

  requestPasswordRecovery: async (data: PasswordRecoveryRequest): Promise<void> => {
    await api.post('/password-reset/password-recovery/', data);
  },

  resetPassword: async (data: PasswordResetRequest): Promise<void> => {
    await api.post('/password-reset/reset-password/', data);
  },

  setupInterceptors: () => {
    api.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem('@auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  },
};

authService.setupInterceptors();

export default api;

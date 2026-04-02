import axios from 'axios';
import { tokenStorage } from './secureStorage';

// Create axios instance with default config
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const authHeader = tokenStorage.getAuthHeader();
        if (authHeader) {
            config.headers.Authorization = authHeader;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Token is invalid or expired
            tokenStorage.clearAll();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    // User authentication
    register: async (userData) => {
        const response = await api.post('/users/register', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/users/login', credentials);
        return response.data;
    },

    logout: () => {
        tokenStorage.clearAll();
    }
};

export const expenseAPI = {
    // Expense operations (all require authentication)
    getExpenses: async () => {
        const response = await api.get('/expenses');
        return response.data;
    },

    addExpense: async (expenseData) => {
        const response = await api.post('/expenses', expenseData);
        return response.data;
    },

    updateExpense: async (id, expenseData) => {
        const response = await api.put(`/expenses/${id}`, expenseData);
        return response.data;
    },

    deleteExpense: async (id) => {
        const response = await api.delete(`/expenses/${id}`);
        return response.data;
    }
};

export default api;
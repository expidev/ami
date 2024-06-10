import axios from 'axios';
import AuthService from '../helpers/AuthService';
import { baseURL } from '../config/config';

const baseApi = axios.create({
    baseURL: baseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// Interceptor for protected routes
baseApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const protectedApi = axios.create({
    baseURL: baseURL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

protectedApi.interceptors.request.use(
    (config) => {
        const token = AuthService.getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

protectedApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            AuthService.removeToken();
            window.location.href = '/admin';
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export { baseApi, protectedApi };

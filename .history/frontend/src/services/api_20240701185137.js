// src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5003', // URL base da sua API
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

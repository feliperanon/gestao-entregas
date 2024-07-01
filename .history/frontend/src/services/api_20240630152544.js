import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5003', // ajuste conforme necessário
});

export default api;

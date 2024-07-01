import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5003', // Alterado para a porta 5003
});

export default api;

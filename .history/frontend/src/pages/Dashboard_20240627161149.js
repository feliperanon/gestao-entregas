import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
  const [form, setForm] = useState({ nomeEntregador: '', cliente: '', volume: '' });

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/entregas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntregas(response.data);
      } catch (error) {
        console.error('Error fetching entregas:', error);
      }
    };
    fetchEntregas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/entregas', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas([...entregas, response.data]);
      setForm({ nomeEntregador: '', cliente: '', volume: '' });
    } catch (error) {
      console.error('Error adding entrega:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input name="nomeEntregador" value={form.nomeEntregador} onChange={handleChange} placeholder="Nome do Entregador" required />
        <input name="cliente" value={form.cliente} onChange={handleChange} placeholder="Cliente" required />
        <input name="volume" value={form.volume} onChange={handleChange} placeholder="Volume" required />
        <button type="submit">Iniciar Entrega</button>
      </form>
      <ul>
        {entregas.map((entrega) => (
          <li key={entrega._id}>
            <span>{entrega.nomeEntregador} - {entrega.cliente} - {entrega.volume} - {entrega.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import api from '../services/api';

const socket = io('http://localhost:5000');

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
  const [form, setForm] = useState({ nomeEntregador: 'Felipe Ranon Marinho Pires', cliente: 'Sacolão Beleza', volume: 30, tempoEstimado: 0 });

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

    // Listen for real-time updates
    socket.on('entregaAtualizada', (novaEntrega) => {
      setEntregas((prevEntregas) => {
        const index = prevEntregas.findIndex(entrega => entrega._id === novaEntrega._id);
        if (index !== -1) {
          prevEntregas[index] = novaEntrega;
          return [...prevEntregas];
        } else {
          return [...prevEntregas, novaEntrega];
        }
      });
    });

    return () => socket.off('entregaAtualizada');
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
      socket.emit('novaEntrega', response.data);
      setForm({ nomeEntregador: 'Felipe Ranon Marinho Pires', cliente: 'Sacolão Beleza', volume: 30, tempoEstimado: 0 });
    } catch (error) {
      console.error('Error adding entrega:', error);
    }
  };

  const handleFinalizar = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put(`/entregas/${id}`, { status: 'Finalizada' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      socket.emit('entregaAtualizada', response.data);
    } catch (error) {
      console.error('Error finalizing entrega:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input name="nomeEntregador" value={form.nomeEntregador} onChange={handleChange} placeholder="Nome do Entregador" required />
        <input name="cliente" value={form.cliente} onChange={handleChange} placeholder="Cliente" required />
        <input name="volume" value={form.volume} onChange={handleChange} placeholder="Volume" required />
        <input name="tempoEstimado" value={form.tempoEstimado} onChange={handleChange} placeholder="Tempo Estimado" required />
        <button type="submit">Iniciar Entrega</button>
      </form>
      <h3>Entregas em Andamento</h3>
      <ul>
        {entregas.filter(entrega => entrega.status !== 'Finalizada').map((entrega) => (
          <li key={entrega._id}>
            <span>
              Nome do Entregador: {entrega.nomeEntregador} Cliente: {entrega.cliente} Volume: {entrega.volume} 
              Status: {entrega.status} Tempo Decorrido: 0 minutos Tempo Ideal: Calculado por aprendizado de máquina
            </span>
            <button onClick={() => handleFinalizar(entrega._id)}>Finalizar Entrega</button>
          </li>
        ))}
      </ul>
      <Link to="/history">Ver Histórico</Link>
    </div>
  );
};

export default Dashboard;

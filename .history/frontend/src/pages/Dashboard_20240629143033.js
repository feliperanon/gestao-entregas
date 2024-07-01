// C:\Projeto\gestao-entregas\frontend\src\pages\Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { io } from 'socket.io-client';
import dayjs from 'dayjs';

const entregadores = ['Felipe', 'João', 'Maria']; // Lista manual de entregadores
const clientes = ['Cliente A', 'Cliente B', 'Cliente C']; // Lista manual de clientes
const statusList = ['Em andamento', 'Finalizada']; // Lista manual de status

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
  const [form, setForm] = useState({
    nomeEntregador: '',
    cliente: '',
    volume: '',
    tempoEstimado: '',
    status: '',
  });

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

    const socket = io('http://localhost:5000');
    socket.on('novaEntrega', (entrega) => {
      setEntregas((prevEntregas) => [...prevEntregas, entrega]);
    });
    socket.on('atualizarEntrega', (entrega) => {
      setEntregas((prevEntregas) =>
        prevEntregas.map((e) => (e._id === entrega._id ? entrega : e))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEntregas(prevEntregas =>
        prevEntregas.map(entrega => {
          if (entrega.status === 'Em andamento') {
            const now = dayjs();
            const start = dayjs(entrega.createdAt);
            const tempoDecorrido = now.diff(start, 'minute');
            return { ...entrega, tempoDecorrido };
          }
          return entrega;
        })
      );
    }, 60000); // Atualiza o tempo decorrido a cada minuto

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/entregas', { ...form, tempoDecorrido: 0 }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Obter tempo ideal
      const predicaoResponse = await api.post('/predicao/prever', {
        volume: form.volume,
        tempoEstimado: form.tempoEstimado
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const tempoIdeal = predicaoResponse.data.tempoIdeal;

      setEntregas(prevEntregas => [...prevEntregas, { ...response.data, tempoIdeal }]);
      setForm({
        nomeEntregador: '',
        cliente: '',
        volume: '',
        tempoEstimado: '',
        status: '',
      });
    } catch (error) {
      console.error('Error adding entrega:', error);
    }
  };

  const handleFinalizar = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const entrega = entregas.find(e => e._id === id);
      await api.put(`/entregas/${id}`, { status: 'Finalizada', tempoDecorrido: entrega.tempoDecorrido }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error finalizing entrega:', error);
    }
  };

  const formatTime = (minutes) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}:${remainingMinutes.toString().padStart(2, '0')} horas`;
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <select name="nomeEntregador" value={form.nomeEntregador} onChange={handleChange} required>
          <option value="">Selecione o Entregador</option>
          {entregadores.map(entregador => (
            <option key={entregador} value={entregador}>{entregador}</option>
          ))}
        </select>
        <select name="cliente" value={form.cliente} onChange={handleChange} required>
          <option value="">Selecione o Cliente</option>
          {clientes.map(cliente => (
            <option key={cliente} value={cliente}>{cliente}</option>
          ))}
        </select>
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="">Selecione o Status</option>
          {statusList.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <input name="volume" value={form.volume} onChange={handleChange} placeholder="Volume" required />
        <input name="tempoEstimado" value={form.tempoEstimado} onChange={handleChange} placeholder="Tempo Estimado" required />
        <button type="submit">Iniciar Entrega</button>
      </form>
      <h3>Entregas em Andamento</h3>
      <ul>
        {entregas.filter(entrega => entrega.status !== 'Finalizada').map((entrega) => (
          <li key={entrega._id}>
            <span>{entrega.nomeEntregador} - {entrega.cliente} - {entrega.volume} - {entrega.status} - {entrega.tempoEstimado} minutos - Tempo Em Andamento: {formatTime(entrega.tempoDecorrido)} - Tempo Ideal: {entrega.tempoIdeal ? formatTime(entrega.tempoIdeal) : 'Calculando...'}</span>
            <button onClick={() => handleFinalizar(entrega._id)}>Finalizar Entrega</button>
          </li>
        ))}
      </ul>
      <Link to="/history">Ver Histórico</Link>
    </div>
  );
};

export default Dashboard;

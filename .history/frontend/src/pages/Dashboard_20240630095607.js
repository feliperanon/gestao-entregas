import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
  const [form, setForm] = useState({ nomeEntregador: '', cliente: '', volume: '', status: 'Em andamento', tempoEstimado: '' });

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/entregas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntregas(response.data.filter(entrega => entrega.status === 'Em andamento'));
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
      const response = await api.post('/entregas', { ...form, tempoDecorrido: 0 }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas([...entregas, response.data]);
      setForm({ nomeEntregador: '', cliente: '', volume: '', status: 'Em andamento', tempoEstimado: '' });
    } catch (error) {
      console.error('Error adding entrega:', error);
    }
  };

  const handleFinalize = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.put(`/entregas/${id}`, { status: 'Finalizada' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas(entregas.filter(entrega => entrega._id !== id));
    } catch (error) {
      console.error('Error finalizing entrega:', error);
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/clientes">Clientes</Link></li>
          <li><Link to="/entregadores">Entregadores</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/analise">Analise</Link></li>
        </ul>
      </nav>
      <h2>Entregas em Andamento</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome

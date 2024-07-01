import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
  const [form, setForm] = useState({ nomeEntregador: '', cliente: '', volume: '', tempoEstimado: '' });

  useEffect(() => {
    const fetchEntregas = async () => {
      const response = await api.get('/entregas');
      setEntregas(response.data);
    };
    fetchEntregas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/entregas', form);
    setForm({ nomeEntregador: '', cliente: '', volume: '', tempoEstimado: '' });
  };

  const handleFinalizar = async (id) => {
    await api.put(`/entregas/${id}`, { status: 'Finalizada' });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input name="nomeEntregador" value={form.nomeEntregador} onChange={handleChange} placeholder="Nome do Entregador" />
        <input name="cliente" value={form.cliente} onChange={handleChange} placeholder="Cliente" />
        <input name="volume" value={form.volume} onChange={handleChange} placeholder="Volume" />
        <input name="tempoEstimado" value={form.tempoEstimado} onChange={handleChange} placeholder="Tempo Estimado" />
        <button type="submit">Iniciar Entrega</button>
      </form>
      <ul>
        {entregas.map((entrega) => (
          <li key={entrega._id}>
            <span>{entrega.nomeEntregador} - {entrega.cliente} - {entrega.volume}</span>
            <button onClick={() => handleFinalizar(entrega._id)}>Finalizar Entrega</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

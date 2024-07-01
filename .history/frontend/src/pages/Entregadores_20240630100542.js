import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Entregadores = () => {
  const [entregadores, setEntregadores] = useState([]);
  const [form, setForm] = useState({ nome: '', contato: '', placaVeiculo: '' });

  useEffect(() => {
    const fetchEntregadores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/entregadores', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntregadores(response.data);
      } catch (error) {
        console.error('Error fetching entregadores:', error);
      }
    };
    fetchEntregadores();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/entregadores', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregadores([...entregadores, response.data]);
      setForm({ nome: '', contato: '', placaVeiculo: '' });
    } catch (error) {
      console.error('Error adding entregador:', error);
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
      <h2>Gerenciar Entregadores</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="contato" value={form.contato} onChange={handleChange} placeholder="Contato" />
        <input name="placaVeiculo" value={form.placaVeiculo} onChange={handleChange} placeholder="Placa do Veículo" />
        <button type="submit">Adicionar Entregador</button>
      </form>
      <ul>
        {entregadores.map((entregador) => (
          <li key={entregador._id}>
            {entregador.nome} - {entregador.contato} - {entregador.placaVeiculo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Entregadores;

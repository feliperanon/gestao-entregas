import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Entregadores = () => {
  const [entregadores, setEntregadores] = useState([]);
  const [form, setForm] = useState({ nome: '', telefone: '' });

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
      setForm({ nome: '', telefone: '' });
    } catch (error) {
      console.error('Error creating entregador:', error);
    }
  };

  return (
    <div>
      <h2>Entregadores</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" required />
        <button type="submit">Adicionar Entregador</button>
      </form>
      <ul>
        {entregadores.map((entregador) => (
          <li key={entregador._id}>{entregador.nome} - {entregador.telefone}</li>
        ))}
      </ul>
    </div>
  );
};

export default Entregadores;

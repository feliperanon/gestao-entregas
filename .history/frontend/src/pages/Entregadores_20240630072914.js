import React, { useState } from 'react';
import api from '../services/api';

const Entregador = () => {
  const [form, setForm] = useState({ nome: '', telefone: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/entregadores', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ nome: '', telefone: '' });
    } catch (error) {
      console.error('Error adding entregador:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Entregador</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone (opcional)" />
        <button type="submit">Adicionar Entregador</button>
      </form>
    </div>
  );
};

export default Entregador;

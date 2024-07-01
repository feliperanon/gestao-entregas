import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nome: '', telefone: '' });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/clientes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientes(response.data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/clientes', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClientes([...clientes, response.data]);
      setForm({ nome: '', telefone: '' });
    } catch (error) {
      console.error('Error adding cliente:', error);
    }
  };

  return (
    <div>
      <h2>Gerenciar Clientes</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" />
        <button type="submit">Adicionar Cliente</button>
      </form>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente._id}>
            {cliente.nome} - {cliente.telefone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({ nome: '', telefone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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
      if (isEditing) {
        const response = await api.put(`/clientes/${currentId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientes(clientes.map(cliente => cliente._id === currentId ? response.data : cliente));
        setIsEditing(false);
        setCurrentId(null);
      } else {
        const response = await api.post('/clientes', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setClientes([...clientes, response.data]);
      }
      setForm({ nome: '', telefone: '' });
    } catch (error) {
      console.error('Error adding/editing cliente:', error);
    }
  };

  const handleEdit = (cliente) => {
    setForm({ nome: cliente.nome, telefone: cliente.telefone });
    setIsEditing(true);
    setCurrentId(cliente._id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClientes(clientes.filter(cliente => cliente._id !== id));
    } catch (error) {
      console.error('Error deleting cliente:', error);
    }
  };

  return (
    <div>
      <h2>Gerenciar Clientes</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" />
        <button type="submit">{isEditing ? 'Editar Cliente' : 'Adicionar Cliente'}</button>
      </form>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente._id}>
            {cliente.nome} - {cliente.telefone}
            <button onClick={() => handleEdit(cliente)}>Editar</button>
            <button onClick={() => handleDelete(cliente._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;

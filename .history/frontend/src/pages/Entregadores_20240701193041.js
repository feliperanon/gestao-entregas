import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Entregadores = () => {
  const [entregadores, setEntregadores] = useState([]);
  const [form, setForm] = useState({ nome: '', telefone: '' });
  const [editing, setEditing] = useState(false);
  const [currentEntregador, setCurrentEntregador] = useState(null);

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
      if (editing) {
        const response = await api.put(`/entregadores/${currentEntregador._id}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntregadores(entregadores.map(entregador => 
          entregador._id === currentEntregador._id ? response.data : entregador
        ));
        setEditing(false);
        setCurrentEntregador(null);
      } else {
        const response = await api.post('/entregadores', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntregadores([...entregadores, response.data]);
      }
      setForm({ nome: '', telefone: '' });
    } catch (error) {
      console.error('Error creating/updating entregador:', error);
    }
  };

  const handleEdit = (entregador) => {
    setEditing(true);
    setCurrentEntregador(entregador);
    setForm({ nome: entregador.nome, telefone: entregador.telefone });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/entregadores/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregadores(entregadores.filter(entregador => entregador._id !== id));
    } catch (error) {
      console.error('Error deleting entregador:', error);
    }
  };

  return (
    <div>
      <h2>Entregadores</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" />
        <button type="submit">{editing ? 'Atualizar' : 'Adicionar'} Entregador</button>
      </form>
      <ul>
        {entregadores.map((entregador) => (
          <li key={entregador._id}>
            {entregador.nome} - {entregador.telefone}
            <button onClick={() => handleEdit(entregador)}>Editar</button>
            <button onClick={() => handleDelete(entregador._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Entregadores;

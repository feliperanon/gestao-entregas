import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Status = () => {
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({ nome: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const fetchStatusList = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/status', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStatusList(response.data);
      } catch (error) {
        console.error('Error fetching status list:', error);
      }
    };

    fetchStatusList();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (isEditing) {
        const response = await api.put(`/status/${currentId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStatusList(statusList.map(status => status._id === currentId ? response.data : status));
        setIsEditing(false);
        setCurrentId(null);
      } else {
        const response = await api.post('/status', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStatusList([...statusList, response.data]);
      }
      setForm({ nome: '' });
    } catch (error) {
      console.error('Error adding/editing status:', error);
    }
  };

  const handleEdit = (status) => {
    setForm({ nome: status.nome });
    setIsEditing(true);
    setCurrentId(status._id);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/status/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatusList(statusList.filter(status => status._id !== id));
    } catch (error) {
      console.error('Error deleting status:', error);
    }
  };

  return (
    <div>
      <h2>Gerenciar Status</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do Status" required />
        <button type="submit">{isEditing ? 'Editar Status' : 'Adicionar Status'}</button>
      </form>
      <ul>
        {statusList.map((status) => (
          <li key={status._id}>
            {status.nome}
            <button onClick={() => handleEdit(status)}>Editar</button>
            <button onClick={() => handleDelete(status._id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Status;

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Status = () => {
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({ nome: '' });

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
      const response = await api.post('/status', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatusList([...statusList, response.data]);
      setForm({ nome: '' });
    } catch (error) {
      console.error('Error adding status:', error);
    }
  };

  return (
    <div>
      <h2>Gerenciar Status</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome do Status" required />
        <button type="submit">Adicionar Status</button>
      </form>
      <ul>
        {statusList.map((status) => (
          <li key={status._id}>
            {status.nome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Status;

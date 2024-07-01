import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);

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
      <h2>Entregas em Andamento</h2>
      <ul>
        {entregas.map((entrega) => (
          <li key={entrega._id}>
            <span>{entrega.nomeEntregador} - {entrega.cliente} - {entrega.volume} - {entrega.status} - {entrega.tempoEstimado} minutos</span>
            <button onClick={() => handleFinalize(entrega._id)}>Finalizar Entrega</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

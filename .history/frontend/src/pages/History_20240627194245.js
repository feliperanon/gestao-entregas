import React, { useState, useEffect } from 'react';
import api from '../services/api';

const History = () => {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/entregas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Filtra as entregas que estão finalizadas
        const entregasFinalizadas = response.data.filter(entrega => entrega.status === 'Finalizada');
        setEntregas(entregasFinalizadas);
      } catch (error) {
        console.error('Error fetching entregas:', error);
      }
    };
    fetchEntregas();
  }, []);

  return (
    <div>
      <h2>Histórico de Entregas</h2>
      <ul>
        {entregas.map((entrega) => (
          <li key={entrega._id}>
            <span>{entrega.nomeEntregador} - {entrega.cliente} - {entrega.volume} - {entrega.tempoEstimado} - {new Date(entrega.updatedAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

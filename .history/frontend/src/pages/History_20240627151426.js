import React, { useState, useEffect } from 'react';
import api from '../services/api';

const History = () => {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    const fetchEntregas = async () => {
      const response = await api.get('/entregas');
      setEntregas(response.data.filter(entrega => entrega.status === 'Finalizada'));
    };
    fetchEntregas();
  }, []);

  return (
    <div>
      <h2>Histórico de Entregas</h2>
      <ul>
        {entregas.map((entrega) => (
          <li key={entrega._id}>
            <span>{entrega.nomeEntregador} - {entrega.cliente} - {entrega.volume} - {entrega.tempoDecorrido}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

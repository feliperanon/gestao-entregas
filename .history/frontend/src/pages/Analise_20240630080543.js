import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import api from '../services/api';

// Registrar as escalas e elementos necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const Analise = () => {
  const [entregas, setEntregas] = useState([]);

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/entregas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntregas(response.data);
      } catch (error) {
        console.error('Error fetching entregas:', error);
      }
    };
    fetchEntregas();
  }, []);

  const processData = (data) => {
    const entregadores = {};
    const clientes = {};

    data.forEach(entrega => {
      if (!entregadores[entrega.nomeEntregador]) {
        entregadores[entrega.nomeEntregador] = { volume: 0, tempo: 0, entregas: 0 };
      }
      if (!clientes[entrega.cliente]) {
        clientes[entrega.cliente] = { volume: 0, tempo: 0, entregas: 0 };
      }

      entregadores[entrega.nomeEntregador].volume += entrega.volume;
      entregadores[entrega.nomeEntregador].tempo += entrega.tempoDecorrido;
      entregadores[entrega.nomeEntregador].entregas += 1;

      clientes[entrega.cliente].volume += entrega.volume;
      clientes[entrega.cliente].tempo += entrega.tempoDecorrido;
      clientes[entrega.cliente].entregas += 1;
    });

    return { entregadores, clientes };
  };

  const { entregadores, clientes } = processData(entregas);

  const entregadoresData = {
    labels: Object.keys(entregadores),
    datasets: [
      {
        label: 'Volume Entregue',
        data: Object.values(entregadores).map(e => e.volume),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Tempo Decorrido (minutos)',
        data: Object.values(entregadores).map(e => e.tempo),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const clientesData = {
    labels: Object.keys(clientes),
    datasets: [
      {
        label: 'Volume Recebido',
        data: Object.values(clientes).map(c => c.volume),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'Tempo Consumido (minutos)',
        data: Object.values(clientes).map(c => c.tempo),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Análise de Informações</h2>
      <div>
        <h3>Entregadores</h3>
        <Bar data={entregadoresData} />
      </div>
      <div>
        <h3>Clientes</h3>
        <Line data={clientesData} />
      </div>
    </div>
  );
};

export default Analise;

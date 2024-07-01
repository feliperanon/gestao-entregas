import React, { useEffect, useState, useCallback } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import api from '../services/api';

// Registrar as escalas e elementos necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const Analise = () => {
  const [entregas, setEntregas] = useState([]);

  const fetchEntregas = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/entregas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas(response.data);
    } catch (error) {
      console.error('Error fetching entregas:', error);
    }
  }, []);

  useEffect(() => {
    fetchEntregas();
  }, [fetchEntregas]);

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
    <StyledContainer>
      <Typography variant="h4" gutterBottom>Análise de Informações</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>Entregadores</Typography>
            <Bar data={entregadoresData} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>Clientes</Typography>
            <Line data={clientesData} />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Analise;

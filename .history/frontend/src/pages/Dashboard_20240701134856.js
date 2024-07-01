import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Button, Select, MenuItem, TextField, Box, Typography, Paper, Grid, Container, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  padding: '20px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
});

const List = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  marginTop: '20px',
});

const ListItem = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
  boxShadow: theme.shadows[1],
}));

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({ nomeEntregador: '', cliente: '', volume: '', status: 'Em andamento', tempoEstimado: '' });

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/entregas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEntregas(response.data.filter(entrega => entrega.status === 'Em andamento').map(entrega => ({
          ...entrega,
          tempoDecorrido: calculateTempoDecorrido(entrega.dataInicio)
        })));
      } catch (error) {
        console.error('Error fetching entregas:', error);
      }
    };

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

    fetchEntregas();
    fetchEntregadores();
    fetchClientes();
    fetchStatusList();

    const intervalId = setInterval(() => {
      setEntregas((prevEntregas) => 
        prevEntregas.map((entrega) => ({
          ...entrega,
          tempoDecorrido: calculateTempoDecorrido(entrega.dataInicio)
        }))
      );
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(intervalId); // Limpa o intervalo quando o componente desmonta
  }, []);

  const calculateTempoDecorrido = (dataInicio) => {
    const now = new Date();
    const inicio = new Date(dataInicio);
    const diffInMinutes = Math.floor((now - inicio) / 60000); // Calcula a diferença em minutos
    return diffInMinutes;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const entregadorExistente = entregas.find(entrega => entrega.nomeEntregador === form.nomeEntregador);
      if (entregadorExistente) {
        alert('O entregador já está em uma rotina de entrega.');
        return;
      }

      const token = localStorage.getItem('token');
      const novaEntrega = {
        ...form,
        dataInicio: new Date().toISOString() // Adiciona a data e hora de início
      };
      const response = await api.post('/entregas', novaEntrega, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas([...entregas, { ...response.data, tempoDecorrido: calculateTempoDecorrido(response.data.dataInicio) }]);
      setForm({ nomeEntregador: '', cliente: '', volume: '', status: 'Em andamento', tempoEstimado: '' });
    } catch (error) {
      console.error('Error adding entrega:', error);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/entregas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas(entregas.filter(entrega => entrega._id !== id));
    } catch (error) {
      console.error('Error deleting entrega:', error);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Entregas em Andamento
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Select
            name="nomeEntregador"
            value={form.nomeEntregador}
            onChange={handleChange}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>
              Selecione o Entregador
            </MenuItem>
            {entregadores.map((entregador) => (
              <MenuItem key={entregador._id} value={entregador.nome}>{entregador.nome}</MenuItem>
            ))}
          </Select>
          <Select
            name="cliente"
            value={form.cliente}
            onChange={handleChange}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>
              Selecione o Cliente
            </MenuItem>
            {clientes.map((cliente) => (
              <MenuItem key={cliente._id} value={cliente.nome}>{cliente.nome}</MenuItem>
            ))}
          </Select>
          <Select
            name="status"
            value={form.status}
            onChange={handleChange}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>
              Selecione o Status
            </MenuItem>
            {statusList.map((status) => (
              <MenuItem key={status._id} value={status.nome}>{status.nome}</MenuItem>
            ))}
          </Select>
          <TextField
            name="volume"
            value={form.volume}
            onChange={handleChange}
            label="Volume"
            required
          />
          <TextField
            name="tempoEstimado"
            value={form.tempoEstimado}
            onChange={handleChange}
            label="Tempo Estimado"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Adicionar Entrega
          </Button>
        </Form>
        <List>
          {entregas.map((entrega) => (
            <ListItem key={entrega._id}>
              <Box>
                <Typography variant="body1">
                  {entrega.nomeEntregador} - {entrega.cliente} - {entrega.volume} - {entrega.status} - {entrega.tempoEstimado} minutos - Tempo Em Andamento: {entrega.tempoDecorrido} minutos
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleFinalize(entrega._id)} color="primary">
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(entrega._id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Dashboard;

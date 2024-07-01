import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import api from '../services/api';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  form: {
    marginBottom: theme.spacing(2),
  },
  formControl: {
    minWidth: 120,
    marginBottom: theme.spacing(2),
  },
  listItem: {
    marginBottom: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [entregas, setEntregas] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({ nomeEntregador: '', cliente: '', volume: '', status: 'Em andamento', tempoEstimado: '' });

  const fetchEntregas = useCallback(async () => {
    try {
      const response = await api.get('/entregas');
      console.log('Fetch Entregas:', response.data);
      const entregasComTempoDecorrido = response.data.map(entrega => ({
        ...entrega,
        tempoDecorrido: calculateTempoDecorrido(entrega.dataInicio)
      }));
      setEntregas(entregasComTempoDecorrido);
    } catch (error) {
      console.error('Error fetching entregas:', error);
    }
  }, []);

  useEffect(() => {
    const fetchEntregadores = async () => {
      try {
        const response = await api.get('/entregadores');
        setEntregadores(response.data);
      } catch (error) {
        console.error('Error fetching entregadores:', error);
      }
    };

    const fetchClientes = async () => {
      try {
        const response = await api.get('/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error fetching clientes:', error);
      }
    };

    const fetchStatusList = async () => {
      try {
        const response = await api.get('/status');
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
  }, [fetchEntregas]);

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
      const entregadorExistente = entregas.find(entrega => entrega.nomeEntregador === form.nomeEntregador && entrega.status === 'Em andamento');
      if (entregadorExistente) {
        alert('O entregador já está em uma rotina de entrega.');
        return;
      }

      const novaEntrega = {
        ...form,
        dataInicio: new Date().toISOString() // Adiciona a data e hora de início
      };
      const response = await api.post('/entregas', novaEntrega);
      setEntregas([...entregas, { ...response.data, tempoDecorrido: calculateTempoDecorrido(response.data.dataInicio) }]);
      setForm({ nomeEntregador: '', cliente: '', volume: '', status: 'Em andamento', tempoEstimado: '' });
    } catch (error) {
      console.error('Error adding entrega:', error);
    }
  };

  const handleFinalize = async (id) => {
    try {
      console.log('Finalizing entrega with ID:', id);
      const response = await api.put(`/entregas/${id}`, { status: 'Finalizada' });
      console.log('Finalization response:', response.data);
      setEntregas((prevEntregas) => prevEntregas.filter(entrega => entrega._id !== id));
      fetchEntregas(); // Atualiza a lista de entregas após a finalização
    } catch (error) {
      console.error('Error finalizing entrega:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Deleting entrega with ID:', id);
      await api.delete(`/entregas/${id}`);
      setEntregas((prevEntregas) => prevEntregas.filter(entrega => entrega._id !== id));
    } catch (error) {
      console.error('Error deleting entrega:', error);
    }
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h4" gutterBottom>Entregas em Andamento</Typography>
      <Paper elevation={3} className={classes.form}>
        <Box p={2}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel>Entregador</InputLabel>
              <Select
                name="nomeEntregador"
                value={form.nomeEntregador}
                onChange={handleChange}
                required
              >
                {entregadores.map((entregador) => (
                  <MenuItem key={entregador._id} value={entregador.nome}>{entregador.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel>Cliente</InputLabel>
              <Select
                name="cliente"
                value={form.cliente}
                onChange={handleChange}
                required
              >
                {clientes.map((cliente) => (
                  <MenuItem key={cliente._id} value={cliente.nome}>{cliente.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              name="volume"
              label="Volume"
              value={form.volume}
              onChange={handleChange}
              required
              className={classes.formControl}
            />
            <TextField
              fullWidth
              name="tempoEstimado"
              label="Tempo Estimado (minutos)"
              value={form.tempoEstimado}
              onChange={handleChange}
              required
              className={classes.formControl}
            />
            <Button type="submit" variant="contained" color="primary">Adicionar Entrega</Button>
          </form>
        </Box>
      </Paper>
      <List>
        {entregas.filter(entrega => entrega.status === 'Entrega').map((entrega) => (
          <ListItem key={entrega._id} className={classes.listItem} component={Paper} elevation={1}>
            <ListItemText
              primary={`${entrega.nomeEntregador} - ${entrega.cliente}`}
              secondary={`Volume: ${entrega.volume} - Status: ${entrega.status} - Tempo Estimado: ${entrega.tempoEstimado} minutos - Tempo Em Andamento: ${entrega.tempoDecorrido} minutos`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="finalize" onClick={() => handleFinalize(entrega._id)}>
                <CheckIcon color="primary" />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(entrega._id)}>
                <DeleteIcon color="secondary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dashboard;

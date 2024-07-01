import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, TextField, Button, Box, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledForm = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const Entregadores = () => {
  const [entregadores, setEntregadores] = useState([]);
  const [form, setForm] = useState({ nome: '', telefone: '' });
  const [editing, setEditing] = useState(false);
  const [currentEntregador, setCurrentEntregador] = useState(null);

  const fetchEntregadores = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/entregadores', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregadores(response.data);
    } catch (error) {
      console.error('Error fetching entregadores:', error);
    }
  }, []);

  useEffect(() => {
    fetchEntregadores();
  }, [fetchEntregadores]);

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
    <StyledContainer>
      <Typography variant="h4" gutterBottom>Gestão de Entregadores</Typography>
      <Paper elevation={3}>
        <StyledForm p={2}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="nome"
              value={form.nome}
              onChange={handleChange}
              label="Nome"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              label="Telefone"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {editing ? 'Atualizar' : 'Adicionar'} Entregador
            </Button>
          </form>
        </StyledForm>
      </Paper>
      <List>
        {entregadores.map((entregador) => (
          <StyledListItem key={entregador._id}>
            <ListItemText
              primary={`${entregador.nome} - ${entregador.telefone}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(entregador)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(entregador._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </StyledListItem>
        ))}
      </List>
    </StyledContainer>
  );
};

export default Entregadores;

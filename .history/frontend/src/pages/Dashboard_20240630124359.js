import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({ nomeEntregador: '', cliente: '', volume: '', status: 'Em andamento', tempoEstimado: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [entregasResponse, entregadoresResponse, clientesResponse, statusResponse] = await Promise.all([
          api.get('/entregas', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/entregadores', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/clientes', { headers: { Authorization: `Bearer ${token}` } }),
          api.get('/status', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setEntregas(entregasResponse.data.map(entrega => ({
          ...entrega,
          tempoDecorrido: calculateTempoDecorrido(entrega.dataInicio)
        })));
        setEntregadores(entregadoresResponse.data);
        setClientes(clientesResponse.data);
        setStatusList(statusResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

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
      const entregadorExistente = entregas.find(entrega => entrega.nomeEntregador === form.nomeEntregador && entrega.status === 'Em andamento');
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
      setEntregas([...entregas, { ...response.data, tempoDecorrido: calculateTempoDecorrido(novaEntrega.dataInicio) }]);
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
    <div>
      <h2>Entregas em Andamento</h2>
      <form onSubmit={handleSubmit}>
        <select name="nomeEntregador" value={form.nomeEntregador} onChange={handleChange} required>
          <option value="">Selecione o Entregador</option>
          {entregadores.map((entregador) => (
            <option key={entregador._id} value={entregador.nome}>{entregador.nome}</option>
          ))}
        </select>
        <select name="cliente" value={form.cliente} onChange={handleChange} required>
          <option value="">Selecione o Cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente._id} value={cliente.nome}>{cliente.nome}</option>
          ))}
        </select>
        <select name="status" value={form.status} onChange={handleChange} required>
          <option value="">Selecione o Status</option>
          {statusList.map((status) => (
            <option key={status._id} value={status.nome}>{status.nome}</option>
          ))}
        </select>
        <input name="volume" value={form.volume} onChange={handleChange} placeholder="Volume" required />
        <input name="tempoEstimado" value={form.tempoEstimado} onChange={handleChange} placeholder="Tempo Estimado" required />
        <button type="submit">Adicionar Entrega</button>
      </form>
      <ul>
        {entregas.map((entrega) => (
          <li key={entrega._id}>
            <span>{entrega.nomeEntregador} - {entrega.cliente} - {entrega.volume} - {entrega.status} - {entrega.tempoEstimado} minutos - Tempo Em Andamento: {entrega.tempoDecorrido} minutos</span>
            <button onClick={() => handleFinalize(entrega._id)}>Finalizar Entrega</button>
            <button onClick={() => handleDelete(entrega._id)}>Excluir Entrega</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

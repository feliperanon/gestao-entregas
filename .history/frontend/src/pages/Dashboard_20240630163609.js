import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [form, setForm] = useState({ nomeEntregador: '', cliente: '', volume: '', status: 'Em andamento', tempoEstimado: '' });

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const response = await api.get('/entregas');
        console.log('Fetch Entregas:', response.data);
        setEntregas(response.data.map(entrega => ({
          ...entrega,
          tempoDecorrido: calculateTempoDecorrido(entrega.dataInicio)
        })));
      } catch (error) {
        console.error('Error fetching entregas:', error);
      }
    };

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
      const response = await api.put(`/entregas/${id}`, { status: 'Finalizada' });
      setEntregas(entregas.map(entrega => 
        entrega._id === id ? { ...entrega, status: 'Finalizada' } : entrega
      ));
    } catch (error) {
      console.error('Error finalizing entrega:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/entregas/${id}`);
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

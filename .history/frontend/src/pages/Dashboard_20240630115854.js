import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [entregas, setEntregas] = useState([]);
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
    fetchEntregas();

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
      const token = localStorage.getItem('token');
      const novaEntrega = {
        ...form,
        dataInicio: new Date().toISOString() // Adiciona a data e hora de início
      };
      const response = await api.post('/entregas', novaEntrega, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntregas([...entregas, { ...response.data, tempoDecorrido: 0 }]);
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
          {/* Exemplo: Substitua pelos entregadores do estado ou faça uma requisição para buscá-los */}
          <option value="Entregador 1">Entregador 1</option>
          <option value="Entregador 2">Entregador 2</option>
        </select>
        <select name="cliente" value={form.cliente} onChange={handleChange} required>
          <option value="">Selecione o Cliente</option>
          {/* Exemplo: Substitua pelos clientes do estado ou faça uma requisição para buscá-los */}
          <option value="Cliente 1">Cliente 1</option>
          <option value="Cliente 2">Cliente 2</option>
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

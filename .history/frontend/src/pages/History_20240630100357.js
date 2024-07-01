import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const History = () => {
  const [entregas, setEntregas] = useState([]);
  const [filteredEntregas, setFilteredEntregas] = useState([]);
  const [filters, setFilters] = useState({ nomeEntregador: '', cliente: '', volume: '' });
  const [sortOrder, setSortOrder] = useState('dateDesc');

  useEffect(() => {
    const fetchEntregas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/entregas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const entregasFinalizadas = response.data.filter(entrega => entrega.status === 'Finalizada');
        setEntregas(entregasFinalizadas);
        setFilteredEntregas(entregasFinalizadas);
      } catch (error) {
        console.error('Error fetching entregas:', error);
      }
    };
    fetchEntregas();
  }, []);

  useEffect(() => {
    let result = entregas;

    if (filters.nomeEntregador) {
      result = result.filter(entrega => entrega.nomeEntregador.toLowerCase().includes(filters.nomeEntregador.toLowerCase()));
    }

    if (filters.cliente) {
      result = result.filter(entrega => entrega.cliente.toLowerCase().includes(filters.cliente.toLowerCase()));
    }

    if (filters.volume) {
      result = result.filter(entrega => entrega.volume.toString().includes(filters.volume));
    }

    if (sortOrder === 'dateAsc') {
      result = result.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    } else if (sortOrder === 'dateDesc') {
      result = result.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else if (sortOrder === 'volumeAsc') {
      result = result.sort((a, b) => a.volume - b.volume);
    } else if (sortOrder === 'volumeDesc') {
      result = result.sort((a, b) => b.volume - a.volume);
    }

    setFilteredEntregas(result);
  }, [filters, sortOrder, entregas]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/clientes">Clientes</Link></li>
          <li><Link to="/entregadores">Entregadores</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/analise">Analise</Link></li>
        </ul>
      </nav>
      <h2>Histórico de Entregas</h2>
      <div>
        <input
          name="nomeEntregador"
          value={filters.nomeEntregador}
          onChange={handleFilterChange}
          placeholder="Filtrar por Nome do Entregador"
        />
        <input
          name="cliente"
          value={filters.cliente}
          onChange={handleFilterChange}
          placeholder="Filtrar por Cliente"
        />
        <input
          name="volume"
          value={filters.volume}
          onChange={handleFilterChange}
          placeholder="Filtrar por Volume"
        />
        <select name="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="dateDesc">Ordenar por Data (Decrescente)</option>
          <option value="dateAsc">Ordenar por Data (Crescente)</option>
          <option value="volumeDesc">Ordenar por Volume (Decrescente)</option>
          <option value="volumeAsc">Ordenar por Volume (Crescente)</option>
        </select>
      </div>
      <

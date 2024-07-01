import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Entregadores from './pages/Entregadores';
import History from './pages/History';
import Login from './pages/Login';
import Status from './pages/Status';
import Analise from './pages/Analise';

const App = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/entregadores" element={<Entregadores />} />
      <Route path="/history" element={<History />} />
      <Route path="/login" element={<Login />} />
      <Route path="/status" element={<Status />} />
      <Route path="/analise" element={<Analise />} />
    </Routes>
  );
};

export default App;

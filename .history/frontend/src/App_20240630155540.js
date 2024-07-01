import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './components/Clientes';
import Entregadores from './components/Entregadores';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Status from './components/Status';
import Analise from './components/Analise';
import History from './components/History';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/entregadores" element={<Entregadores />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/status" element={<Status />} />
        <Route path="/analise" element={<Analise />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;

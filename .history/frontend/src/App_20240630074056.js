import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Entregadores from './pages/Entregadores';
import History from './pages/History';
import Login from './pages/Login';
import Analise from './pages/Analise';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/entregadores" element={<Entregadores />} />
        <Route path="/history" element={<History />} />
        <Route path="/analise" element={<Analise />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Entregadores from './pages/Entregadores';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Status from './pages/Status';
import Analise from './pages/Analise';
import History from './pages/History';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/clientes">Clientes</Link>
            </li>
            <li>
              <Link to="/entregadores">Entregadores</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/status">Status</Link>
            </li>
            <li>
              <Link to="/analise">Análise</Link>
            </li>
            <li>
              <Link to="/history">Histórico</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/entregadores" element={<Entregadores />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/status" element={<Status />} />
          <Route path="/analise" element={<Analise />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

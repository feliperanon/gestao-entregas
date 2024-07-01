import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Entregadores from './pages/Entregadores';
import History from './pages/History';
import Analise from './pages/Analise';
import Login from './pages/Login';
import Status from './pages/Status'; // Adicione a importação da página Status

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/entregadores">Entregadores</Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/analise">Analise</Link></li>
            <li><Link to="/status">Status</Link></li> {/* Adicione o link para a página Status */}
          </ul>
        </nav>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/entregadores" element={<Entregadores />} />
          <Route path="/history" element={<History />} />
          <Route path="/analise" element={<Analise />} />
          <Route path="/status" element={<Status />} /> {/* Adicione a rota para a página Status */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

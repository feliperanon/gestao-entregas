import React from 'react';
import { Link } from 'react-router-dom';

const Analise = () => {
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
      <h2>Análise</h2>
      {/* Adicione aqui o código para análise */}
    </div>
  );
};

export default Analise;

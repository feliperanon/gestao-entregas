// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Entregadores from './pages/Entregadores';
import Login from './pages/Login';
import Status from './pages/Status';
import Analise from './pages/Analise';
import History from './pages/History';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/entregadores" element={<Entregadores />} />
          <Route path="/login" element={<Login />} />
          <Route path="/status" element={<Status />} />
          <Route path="/analise" element={<Analise />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

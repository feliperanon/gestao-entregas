const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const entregaRoutes = require('./routes/entregaRoutes');
const userRoutes = require('./routes/userRoutes');
const clienteRoutes = require('./routes/clienteRoutes'); // Verifique o caminho e nome aqui
const predicaoRoutes = require('./routes/predicaoRoutes');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://feliperanon:U73E4sULHTcw7wY8@cluster0.1mx4j3k.mongodb.net/gestaoEntregas?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

app.use('/entregas', entregaRoutes(io));
app.use('/users', userRoutes);
app.use('/clientes', clienteRoutes); // Adicionando a rota de clientes
app.use('/predicao', predicaoRoutes);

server.listen(5000, () => {
    console.log('Server running on port 5000');
});

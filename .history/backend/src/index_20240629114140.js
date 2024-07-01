const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const entregaRoutes = require('./routes/entregaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://feliperanon:7RaIKZgmDf4XHUw0@cluster0.1mx4j3k.mongodb.net/myDatabase?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

app.use('/entregas', entregaRoutes);
app.use('/users', userRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('novaEntrega', (entrega) => {
    io.emit('entregaAtualizada', entrega);
  });

  socket.on('entregaAtualizada', (entrega) => {
    io.emit('entregaAtualizada', entrega);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});

module.exports = io;

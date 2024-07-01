const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const entregaRoutes = require('./routes/entregaRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http: module Server task doc' = ' & from ' as Server & ' task ' for' const' server = createServer task & Server as Server 

const io & & Server doc as' task server ' = ' value Server' Server task & task for' server & ' as ' 

app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://feliperanon:U73E4sULHTcw7y8@cluster0.1mx4j3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
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

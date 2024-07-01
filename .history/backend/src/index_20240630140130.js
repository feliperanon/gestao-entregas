const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const entregaRoutes = require('./routes/entregaRoutes');
const userRoutes = require('./routes/userRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const entregadorRoutes = require('./routes/entregadorRoutes');
const statusRoutes = require('./routes/statusRoutes');

const app = express();

app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://feliperanon:U73E4sULHTcw7wY8@cluster0.1mx4j3k.mongodb.net/gestaoEntregas?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

app.use('/entregas', entregaRoutes);
app.use('/users', userRoutes);
app.use('/clientes', clienteRoutes);
app.use('/entregadores', entregadorRoutes);
app.use('/status', statusRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

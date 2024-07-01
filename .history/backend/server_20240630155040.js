const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const entregaRoutes = require('./routes/entregaRoutes');
const userRoutes = require('./routes/userRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const entregadorRoutes = require('./routes/entregadorRoutes');
const statusRoutes = require('./routes/statusRoutes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
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

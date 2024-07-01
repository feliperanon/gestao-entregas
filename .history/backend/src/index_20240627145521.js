const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const entregaRoutes = require('./routes/entregaRoutes');

const app = express();

app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://feliperanon:<password>@cluster0.1mx4j3k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB', err));

app.use('/entregas', entregaRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});


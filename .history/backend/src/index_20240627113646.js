const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const entregaRoutes = require('./routes/entregaRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/entregas', entregaRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const entregaRoutes = require('./routes/entregaRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use('/entregas', entregaRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

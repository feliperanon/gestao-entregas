const mongoose = require('mongoose');

const EntregaSchema = new mongoose.Schema({
    nomeEntregador: String,
    cliente: String,
    volume: Number,
    status: String,
    tempoDecorrido: Number,
    tempoIdeal: Number,
});

module.exports = mongoose.model('Entrega', EntregaSchema);

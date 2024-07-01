const mongoose = require('mongoose');

const EntregadorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    contato: {
        type: String,
        required: false
    },
    placaVeiculo: {
        type: String,
        required: false
    }
});

const Entregador = mongoose.model('Entregador', EntregadorSchema);

module.exports = Entregador;

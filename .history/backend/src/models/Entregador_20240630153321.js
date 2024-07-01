const mongoose = require('mongoose');

const entregadorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Entregador = mongoose.model('Entregador', entregadorSchema);

module.exports = Entregador;

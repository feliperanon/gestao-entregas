const mongoose = require('mongoose');

const EntregaSchema = new mongoose.Schema({
  nomeEntregador: {
    type: String,
    required: true,
  },
  cliente: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  tempoDecorrido: {
    type: Number,
    required: true,
    default: 0,
  },
  tempoEstimado: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Entrega = mongoose.model('Entrega', EntregaSchema);

module.exports = Entrega;

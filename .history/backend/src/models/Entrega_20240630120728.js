// backend/src/models/Entrega.js
const mongoose = require('mongoose');

const entregaSchema = new mongoose.Schema({
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
  tempoEstimado: {
    type: Number,
    required: true,
  },
  dataInicio: {
    type: Date,
    default: Date.now, // Adiciona a data e hora de início
  }
}, {
  timestamps: true,
});

const Entrega = mongoose.model('Entrega', entregaSchema);

module.exports = Entrega;

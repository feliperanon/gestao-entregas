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
  tempoEstimado: {
    type: Number,
    required: true,
  },
  dataInicio: {
    type: Date,
    default: Date.now,
  },
  tempoDecorrido: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Entrega', EntregaSchema);

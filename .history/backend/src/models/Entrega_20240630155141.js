const mongoose = require('mongoose');

const entregaSchema = new mongoose.Schema({
  nomeEntregador: { type: String, required: true },
  cliente: { type: String, required: true },
  volume: { type: Number, required: true },
  status: { type: String, required: true },
  tempoEstimado: { type: Number, required: true },
  tempoDecorrido: { type: Number, default: 0 },
  dataInicio: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Entrega', entregaSchema);

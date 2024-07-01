const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  telefone: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;

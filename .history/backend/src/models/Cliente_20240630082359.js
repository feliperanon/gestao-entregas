const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  contato: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;

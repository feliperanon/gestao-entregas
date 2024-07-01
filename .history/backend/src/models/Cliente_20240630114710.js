const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  },
  telefone: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cliente', clienteSchema);

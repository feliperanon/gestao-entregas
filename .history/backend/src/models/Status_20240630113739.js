const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Status', statusSchema);

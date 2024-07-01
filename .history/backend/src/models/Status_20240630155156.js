const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  nome: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Status', statusSchema);

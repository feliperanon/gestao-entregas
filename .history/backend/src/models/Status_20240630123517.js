const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Status', StatusSchema);

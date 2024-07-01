const Entrega = require('../models/entregaModel');

exports.createEntrega = async (req, res) => {
  try {
    const novaEntrega = new Entrega(req.body);
    const savedEntrega = await novaEntrega.save();
    res.status(201).json(savedEntrega);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getEntregas = async (req, res) => {
  try {
    const entregas = await Entrega.find();
    res.status(200).json(entregas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Outros métodos como update e delete

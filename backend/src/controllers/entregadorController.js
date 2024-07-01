const Entregador = require('../models/entregador');

const createEntregador = async (req, res) => {
  try {
    const novoEntregador = new Entregador(req.body);
    const savedEntregador = await novoEntregador.save();
    res.status(201).json(savedEntregador);
  } catch (error) {
    res.status(400).json({ message: 'Error creating entregador', error });
  }
};

const getEntregadores = async (req, res) => {
  try {
    const entregadores = await Entregador.find();
    res.status(200).json(entregadores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entregadores', error });
  }
};

module.exports = { createEntregador, getEntregadores };

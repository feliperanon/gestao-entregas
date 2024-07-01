const Entregador = require('../models/Entregador');

exports.getAll = async (req, res) => {
  try {
    const entregadores = await Entregador.find();
    res.status(200).json(entregadores);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entregadores', error });
  }
};

exports.create = async (req, res) => {
  try {
    const entregador = new Entregador(req.body);
    await entregador.save();
    res.status(201).json(entregador);
  } catch (error) {
    res.status(500).json({ message: 'Error creating entregador', error });
  }
};

exports.update = async (req, res) => {
  try {
    const entregador = await Entregador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(entregador);
  } catch (error) {
    res.status(500).json({ message: 'Error updating entregador', error });
  }
};

exports.delete = async (req, res) => {
  try {
    await Entregador.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting entregador', error });
  }
};

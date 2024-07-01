const Cliente = require('../models/Cliente');

exports.getAll = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clientes', error });
  }
};

exports.create = async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error creating cliente', error });
  }
};

exports.update = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error updating cliente', error });
  }
};

exports.delete = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cliente', error });
  }
};

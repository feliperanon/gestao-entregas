const Entrega = require('../models/entregaModel');

const getEntregas = async (req, res) => {
  try {
    const entregas = await Entrega.find();
    res.json(entregas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entregas', error });
  }
};

const createEntrega = async (req, res) => {
  const { nomeEntregador, cliente, volume, status, tempoEstimado, dataInicio } = req.body;
  try {
    const novaEntrega = new Entrega({ nomeEntregador, cliente, volume, status, tempoEstimado, dataInicio });
    const savedEntrega = await novaEntrega.save();
    res.status(201).json(savedEntrega);
  } catch (error) {
    res.status(400).json({ message: 'Error creating entrega', error });
  }
};

const updateEntrega = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedEntrega = await Entrega.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedEntrega);
  } catch (error) {
    res.status(400).json({ message: 'Error updating entrega', error });
  }
};

const deleteEntrega = async (req, res) => {
  const { id } = req.params;
  try {
    await Entrega.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting entrega', error });
  }
};

module.exports = {
  getEntregas,
  createEntrega,
  updateEntrega,
  deleteEntrega,
};

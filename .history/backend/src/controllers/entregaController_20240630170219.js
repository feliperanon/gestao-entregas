const Entrega = require('../models/entrega');

const getEntregas = async (req, res) => {
  try {
    const entregas = await Entrega.find();
    res.status(200).json(entregas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entregas', error });
  }
};

const createEntrega = async (req, res) => {
  try {
    const novaEntrega = new Entrega(req.body);
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
    if (!updatedEntrega) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }
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

module.exports = { getEntregas, createEntrega, updateEntrega, deleteEntrega };

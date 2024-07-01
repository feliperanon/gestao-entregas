const Entrega = require('../models/Entrega');

exports.getAll = async (req, res) => {
  try {
    const entregas = await Entrega.find();
    res.status(200).json(entregas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entregas', error });
  }
};

exports.create = async (req, res) => {
  try {
    const entrega = new Entrega(req.body);
    await entrega.save();
    res.status(201).json(entrega);
  } catch (error) {
    res.status(500).json({ message: 'Error creating entrega', error });
  }
};

exports.update = async (req, res) => {
  try {
    const entrega = await Entrega.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(entrega);
  } catch (error) {
    res.status(500).json({ message: 'Error updating entrega', error });
  }
};

exports.delete = async (req, res) => {
  try {
    await Entrega.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting entrega', error });
  }
};

const Entrega = require('../models/Entrega');

exports.create = async (req, res) => {
    const novaEntrega = new Entrega(req.body);
    await novaEntrega.save();
    res.status(201).json(novaEntrega);
};

exports.getAll = async (req, res) => {
    const entregas = await Entrega.find();
    res.status(200).json(entregas);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const entrega = await Entrega.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(entrega);
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await Entrega.findByIdAndDelete(id);
    res.status(204).send();
};

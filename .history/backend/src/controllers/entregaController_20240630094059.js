const Entrega = require('../models/Entrega');

exports.create = async (req, res) => {
    try {
        const entrega = new Entrega(req.body);
        await entrega.save();
        res.status(201).json(entrega);
    } catch (error) {
        res.status(400).json({ message: 'Error creating entrega', error });
    }
};

exports.getAll = async (req, res) => {
    try {
        const entregas = await Entrega.find();
        res.status(200).json(entregas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entregas', error });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const entrega = await Entrega.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(entrega);
    } catch (error) {
        res.status(400).json({ message: 'Error updating entrega', error });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await Entrega.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting entrega', error });
    }
};

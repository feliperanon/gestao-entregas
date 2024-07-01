const Entregador = require('../models/Entregador');

exports.create = async (req, res) => {
    try {
        const entregador = new Entregador(req.body);
        await entregador.save();
        res.status(201).json(entregador);
    } catch (error) {
        res.status(400).json({ message: 'Error creating entregador', error });
    }
};

exports.getAll = async (req, res) => {
    try {
        const entregadores = await Entregador.find();
        res.status(200).json(entregadores);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching entregadores', error });
    }
};

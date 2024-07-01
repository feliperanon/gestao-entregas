const Cliente = require('../models/Cliente');

exports.create = async (req, res) => {
    const novoCliente = new Cliente(req.body);
    await novoCliente.save();
    res.status(201).json(novoCliente);
};

exports.getAll = async (req, res) => {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const cliente = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(cliente);
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await Cliente.findByIdAndDelete(id);
    res.status(204).send();
};

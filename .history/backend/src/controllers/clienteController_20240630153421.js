const Cliente = require('../models/cliente');

const createCliente = async (req, res) => {
  try {
    const novoCliente = new Cliente(req.body);
    const savedCliente = await novoCliente.save();
    res.status(201).json(savedCliente);
  } catch (error) {
    res.status(400).json({ message: 'Error creating cliente', error });
  }
};

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clientes', error });
  }
};

module.exports = { createCliente, getClientes };

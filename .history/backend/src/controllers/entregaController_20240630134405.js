const Entrega = require('../models/entregaModel');

// Função para buscar todas as entregas
exports.getAllEntregas = async (req, res) => {
  try {
    const entregas = await Entrega.find();
    res.status(200).json(entregas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Função para adicionar uma nova entrega
exports.addEntrega = async (req, res) => {
  const novaEntrega = new Entrega({
    nomeEntregador: req.body.nomeEntregador,
    cliente: req.body.cliente,
    volume: req.body.volume,
    status: req.body.status,
    tempoEstimado: req.body.tempoEstimado,
    dataInicio: req.body.dataInicio
  });

  try {
    const entregaSalva = await novaEntrega.save();
    res.status(201).json(entregaSalva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Função para atualizar o status de uma entrega
exports.updateEntregaStatus = async (req, res) => {
  try {
    const entrega = await Entrega.findById(req.params.id);
    if (!entrega) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }
    entrega.status = req.body.status;
    const entregaAtualizada = await entrega.save();
    res.status(200).json(entregaAtualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Função para deletar uma entrega
exports.deleteEntrega = async (req, res) => {
  try {
    const entrega = await Entrega.findById(req.params.id);
    if (!entrega) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }
    await entrega.remove();
    res.status(200).json({ message: 'Entrega deletada' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

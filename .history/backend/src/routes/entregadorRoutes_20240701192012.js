const express = require('express');
const router = express.Router();
const Entregador = require('../models/Entregador');

// Obter todos os entregadores
router.get('/', async (req, res) => {
  try {
    const entregadores = await Entregador.find();
    res.json(entregadores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Criar um novo entregador
router.post('/', async (req, res) => {
  const entregador = new Entregador({
    nome: req.body.nome,
    telefone: req.body.telefone
  });
  try {
    const novoEntregador = await entregador.save();
    res.status(201).json(novoEntregador);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Editar um entregador
router.put('/:id', async (req, res) => {
  try {
    const entregador = await Entregador.findById(req.params.id);
    if (!entregador) {
      return res.status(404).json({ message: 'Entregador não encontrado' });
    }

    entregador.nome = req.body.nome || entregador.nome;
    entregador.telefone = req.body.telefone || entregador.telefone;

    const entregadorAtualizado = await entregador.save();
    res.json(entregadorAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Excluir um entregador
router.delete('/:id', async (req, res) => {
  try {
    const entregador = await Entregador.findById(req.params.id);
    if (!entregador) {
      return res.status(404).json({ message: 'Entregador não encontrado' });
    }

    await entregador.remove();
    res.json({ message: 'Entregador excluído' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

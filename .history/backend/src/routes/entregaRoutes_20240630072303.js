const express = require('express');
const Entrega = require('../models/Entrega');
const auth = require('../middleware/auth');

module.exports = (io) => {
  const router = express.Router();

  router.use(auth);

  // Rota para listar todas as entregas
  router.get('/', async (req, res) => {
    const entregas = await Entrega.find();
    res.status(200).json(entregas);
  });

  // Rota para criar uma nova entrega
  router.post('/', async (req, res) => {
    const { nomeEntregador, cliente, volume, tempoEstimado, status } = req.body;
    const novaEntrega = new Entrega({ nomeEntregador, cliente, volume, tempoEstimado, status, tempoDecorrido: 0 });
    await novaEntrega.save();
    io.emit('novaEntrega', novaEntrega);
    res.status(201).json(novaEntrega);
  });

  // Rota para atualizar o status de uma entrega
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status, tempoDecorrido } = req.body;
    const entrega = await Entrega.findByIdAndUpdate(id, { status, tempoDecorrido }, { new: true });
    io.emit('atualizarEntrega', entrega);
    res.status(200).json(entrega);
  });

  // Rota para obter todas as entregas para treinamento do modelo
  router.get('/dados-treinamento', async (req, res) => {
    try {
      const entregas = await Entrega.find({ status: 'Finalizada' });
      res.status(200).json(entregas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar dados para treinamento' });
    }
  });

  return router;
};

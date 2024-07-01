const express = require('express');
const router = express.Router();
const Entrega = require('../models/Entrega');
const auth = require('../middleware/auth');
const io = require('../index');

router.use(auth); // Aplica o middleware a todas as rotas abaixo

// Rota para listar todas as entregas
router.get('/', async (req, res) => {
    const entregas = await Entrega.find();
    res.status(200).json(entregas);
});

// Rota para criar uma nova entrega
router.post('/', async (req, res) => {
    const { nomeEntregador, cliente, volume, tempoEstimado } = req.body;
    const novaEntrega = new Entrega({ nomeEntregador, cliente, volume, tempoEstimado, status: 'Em andamento', tempoDecorrido: 0 });
    await novaEntrega.save();
    io.emit('novaEntrega', novaEntrega);
    res.status(201).json(novaEntrega);
});

// Rota para atualizar o status de uma entrega
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const entrega = await Entrega.findByIdAndUpdate(id, { status }, { new: true });
    io.emit('entregaAtualizada', entrega);
    res.status(200).json(entrega);
});

module.exports = router;

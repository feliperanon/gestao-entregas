const express = require('express');
const router = express.Router();
const Entrega = require('../models/Entrega');
const auth = require('../middleware/auth');

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
    res.status(201).json(novaEntrega);
});

// Rota para atualizar o status de uma entrega
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const entrega = await Entrega.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(entrega);
});

module.exports = router;

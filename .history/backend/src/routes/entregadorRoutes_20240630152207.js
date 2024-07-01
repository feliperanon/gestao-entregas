const express = require('express');
const router = express.Router();
const { getEntregadores, addEntregador, updateEntregador, deleteEntregador } = require('../controllers/entregadorController');

// Rota para obter todos os entregadores
router.get('/', getEntregadores);

// Rota para adicionar um novo entregador
router.post('/', addEntregador);

// Rota para atualizar um entregador existente
router.put('/:id', updateEntregador);

// Rota para deletar um entregador
router.delete('/:id', deleteEntregador);

module.exports = router;

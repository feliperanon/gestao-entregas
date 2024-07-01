const express = require('express');
const { getEntregas, createEntrega, updateEntrega, deleteEntrega } = require('../controllers/entregaController');
const router = express.Router();

router.get('/', getEntregas); // Certifique-se de que getEntregas está importado corretamente
router.post('/', createEntrega);
router.put('/:id', updateEntrega);
router.delete('/:id', deleteEntrega);

module.exports = router;

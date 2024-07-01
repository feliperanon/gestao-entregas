const express = require('express');
const router = express.Router();
const { createEntrega, getEntregas, updateEntrega, deleteEntrega } = require('../controllers/entregaController');

router.post('/', createEntrega);
router.get('/', getEntregas);
router.put('/:id', updateEntrega);
router.delete('/:id', deleteEntrega);

module.exports = router;

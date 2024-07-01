const express = require('express');
const { createEntregador, getEntregadores } = require('../controllers/entregadorController');
const router = express.Router();

router.post('/', createEntregador);
router.get('/', getEntregadores);

module.exports = router;

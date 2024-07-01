const express = require('express');
const { createCliente, getClientes } = require('../controllers/clienteController');
const router = express.Router();

router.post('/', createCliente);
router.get('/', getClientes);

module.exports = router;

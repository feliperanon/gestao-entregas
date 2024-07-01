const express = require('express');
const router = express.Router();
const entregaController = require('../controllers/entregaController');

router.get('/', entregaController.getAllEntregas);
router.post('/', entregaController.addEntrega);
router.put('/:id', entregaController.updateEntregaStatus);
router.delete('/:id', entregaController.deleteEntrega);

module.exports = router;

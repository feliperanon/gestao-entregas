const express = require('express');
const router = express.Router();
const entregaController = require('../controllers/entregaController');

router.post('/', entregaController.createEntrega);
router.get('/', entregaController.getEntregas);
router.put('/:id', entregaController.updateEntrega);
router.delete('/:id', entregaController.deleteEntrega);

module.exports = router;

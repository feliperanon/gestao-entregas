const express = require('express');
const entregaController = require('../controllers/entregaController');
const router = express.Router();

router.post('/', entregaController.create);
router.get('/', entregaController.getAll);
router.put('/:id', entregaController.update);
router.delete('/:id', entregaController.delete);

module.exports = router;

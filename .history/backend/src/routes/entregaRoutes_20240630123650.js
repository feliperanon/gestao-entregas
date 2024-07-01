const express = require('express');
const router = express.Router();
const entregaController = require('../controllers/entregaController');

router.post('/', entregaController.create);
router.get('/', entregaController.getAll);
router.put('/:id', entregaController.update);
router.delete('/:id', entregaController.delete);

module.exports = router;

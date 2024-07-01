const express = require('express');
const router = express.Router();
const entregadorController = require('../controllers/entregadorController');

router.get('/', entregadorController.getAll);
router.post('/', entregadorController.create);
router.put('/:id', entregadorController.update);
router.delete('/:id', entregadorController.delete);

module.exports = router;

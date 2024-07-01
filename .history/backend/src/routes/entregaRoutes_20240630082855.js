const express = require('express');
const entregaController = require('../controllers/entregaController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, entregaController.create);
router.get('/', auth, entregaController.getAll);
router.put('/:id', auth, entregaController.update);
router.delete('/:id', auth, entregaController.delete);

module.exports = router;

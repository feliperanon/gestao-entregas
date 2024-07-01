const express = require('express');
const clienteController = require('../controllers/clienteController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, clienteController.create);
router.get('/', auth, clienteController.getAll);
router.put('/:id', auth, clienteController.update);
router.delete('/:id', auth, clienteController.delete);

module.exports = router;

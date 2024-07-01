const express = require('express');
const entregadorController = require('../controllers/entregadorController');

const router = express.Router();

router.post('/', entregadorController.create);
router.get('/', entregadorController.getAll);

module.exports = router;

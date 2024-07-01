const express = require('express');
const predicaoController = require('../controllers/predicaoController');
const auth = require('../middleware/auth');

const router = express.Router();

// Adicione suas rotas de predição aqui
router.post('/predict', auth, predicaoController.predict);

module.exports = router;

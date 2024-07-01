const express = require('express');
const router = express.Router();
const Entrega = require('../models/Entrega');
const auth = require('../middleware/auth');

router.use(auth); // Aplica o middleware a todas as rotas abaixo

// Exemplo de rota protegida
router.get('/', async (req, res) => {
    const entregas = await Entrega.find();
    res.status(200).json(entregas);
});

// Outras rotas protegidas...
// router.post('/', ...);
// router.put('/:id', ...);
// router.delete('/:id', ...);

module.exports = router;

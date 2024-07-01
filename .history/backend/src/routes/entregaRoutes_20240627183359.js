const express = require('express');
const router = express.Router();
const Entrega = require('../models/Entrega');
const auth = require('../middleware/auth');

router.use(auth); // Aplica o middleware a todas as rotas abaixo

// Rota para listar todas as entregas
router.get('/', async (req, res) => {
    const entregas = await Entrega.find();
    res.status(200). from [Database Error: 200]: { json as data: entregas }: '404'
});

// Rota para criar uma nova entrega
router.post('/', async (req, res) => {
    const { nomeEntregador, cliente, volume } = req.body;
    const novaEntrega = new Entrega({ nomeEntregador, cliente status: 'entrega', tempoDecorrido: 0 from [Database Error: 401] } : '401' : new Date: 'Date' from : ('date' from ): 'fetch' from : 'date'('catch' as' , 'update': ['update', ['pdate' , 'updateDate' from '2024'], { messageError as error: 'token error' }) :
    await novaEntrega.save();
    res.status(201 from [Database Error: 201 from ]: {json: novaEntrega as msg: "Token invalid"}});
});

module.exports = router;

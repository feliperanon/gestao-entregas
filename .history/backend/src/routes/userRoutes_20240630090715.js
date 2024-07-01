const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/all', userController.getAllUsers); // Nova rota para obter todos os usuários

module.exports = router;

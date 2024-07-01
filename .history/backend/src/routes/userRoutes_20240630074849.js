const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;

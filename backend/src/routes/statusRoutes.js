const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.get('/', statusController.getAll);
router.post('/', statusController.create);
router.put('/:id', statusController.update);
router.delete('/:id', statusController.delete);

module.exports = router;

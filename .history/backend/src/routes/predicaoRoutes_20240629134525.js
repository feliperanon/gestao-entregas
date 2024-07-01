// C:\Projeto\gestao-entregas\backend\src\routes\predicaoRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const pickle = require('pickle');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// Rota para prever o tempo ideal de entrega
router.post('/prever', (req, res) => {
  const { volume, tempoEstimado } = req.body;
  
  // Carregar o modelo treinado
  const modelPath = path.resolve(__dirname, '../model/modelo_entrega.pkl');
  fs.readFile(modelPath, (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao carregar o modelo' });
    }

    const model = pickle.loads(data);
    
    // Prever o tempo ideal
    const prediction = model.predict([[volume, tempoEstimado]]);
    res.status(200).json({ tempoIdeal: prediction[0] });
  });
});

module.exports = router;

// C:\Projeto\gestao-entregas\backend\src\routes\predicaoRoutes.js
const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// Rota para prever o tempo ideal de entrega
router.post('/prever', (req, res) => {
  const { volume, tempoEstimado } = req.body;
  
  // Caminho para o script Python
  const scriptPath = path.resolve(__dirname, '../../ml_model/predict.py');
  
  // Executar o script Python
  exec(`python ${scriptPath} ${volume} ${tempoEstimado}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: 'Erro ao executar o script de predição' });
    }
    
    const tempoIdeal = parseFloat(stdout);
    res.status(200).json({ tempoIdeal });
  });
});

module.exports = router;

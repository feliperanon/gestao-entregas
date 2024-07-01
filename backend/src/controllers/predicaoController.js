exports.predict = async (req, res) => {
    try {
      // Implementação da lógica de predição aqui
      const result = {}; // Placeholder para o resultado da predição
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error in prediction', error });
    }
  };
  
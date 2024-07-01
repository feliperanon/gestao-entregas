const updateEntrega = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedEntrega = await Entrega.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedEntrega) {
      return res.status(404).json({ message: 'Entrega não encontrada' });
    }
    res.json(updatedEntrega);
  } catch (error) {
    res.status(400).json({ message: 'Error updating entrega', error });
  }
};

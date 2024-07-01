const Status = require('../models/Status');

exports.getAll = async (req, res) => {
  try {
    const statusList = await Status.find();
    res.status(200).json(statusList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching status list', error });
  }
};

exports.create = async (req, res) => {
  try {
    const status = new Status(req.body);
    await status.save();
    res.status(201).json(status);
  } catch (error) {
    res.status(500).json({ message: 'Error creating status', error });
  }
};

exports.update = async (req, res) => {
  try {
    const status = await Status.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};

exports.delete = async (req, res) => {
  try {
    await Status.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting status', error });
  }
};

// C:\Projeto\gestao-entregas\backend\src\routes\userRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already registered.');

  user = new User({
    email,
    password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = jwt.sign({ _id: user._id }, 'your_jwt_private_key', { expiresIn: '1h' });
  res.send({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = jwt.sign({ _id: user._id }, 'your_jwt_private_key', { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;

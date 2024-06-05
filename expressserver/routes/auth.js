const AuthRouter = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

AuthRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user)
    return res.status(400).send({ message: 'Invalid username or password' });

  const validPassword = await user.verifyPassword(password);

  if (!validPassword)
    return res.status(400).send({ message: 'Invalid username or password' });

  const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// TODO: finish this route
AuthRouter.post('/register', async (req, res) => {});

module.exports = AuthRouter;

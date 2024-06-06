const AuthRouter = require('express').Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

AuthRouter.post('/login', async (req, res) => {
  try {
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

    res.json({ token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

// TODO: finish this route
AuthRouter.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUsername = await User.findOne({ username: username });

    if (existingUsername)
      return res.status(400).send({ message: 'Username already taken' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username: username, password: hashedPassword });
    await user.save();

    res.json({ message: 'User registered successfully', user: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = AuthRouter;

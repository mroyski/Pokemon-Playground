const randomstring = require('randomstring');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const buildUser = async () => {
  const username = randomstring.generate(10);
  const password = randomstring.generate(10);
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await new User({
    username: username,
    password: hashedPassword,
  }).save();

  return user;
};

module.exports = { buildUser };

require('dotenv-flow').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon');
const User = require('../models/user');

const connect = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
};

const connectInMemory = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { dbName: 'pokemonDb' }).then(seed());
  console.log(`MongoDB successfully connected to ${mongoUri}`);

  // stop running MongoMemoryServer on restarts with nodemon
  process.once('SIGUSR2', async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    process.kill(process.pid, 'SIGUSR2');
  });
};

const seed = async () => {
  const user = new User({
    username: 'tester',
    // password: 'abc123'
    password: '$2b$10$p1SSYtAuXA8zG3R0NwgC2.nkqaLTlmZ8sBbE4QzyXfelkYfmMqS0K',
  });

  await user.save();

  const pokemon1 = new Pokemon({
    pokedexId: 1,
    name: 'bulbasaur',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    user: user._id,
  });

  await pokemon1.save();

  const pokemon2 = new Pokemon({
    pokedexId: 56,
    name: 'mankey',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png',
    user: user._id,
  });

  await pokemon2.save();
};

module.exports = { connect, connectInMemory, seed };

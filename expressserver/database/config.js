const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon');
const User = require('../models/user');

const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { dbName: 'pokemonDb' });
  console.log(`MongoDB successfully connected to ${mongoUri}`);

  // stop running MongoMemoryServer on restarts with nodemon
  process.once('SIGUSR2', async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
    process.kill(process.pid, 'SIGUSR2');
  });
};

const seed = async () => {
  const pokemon1 = new Pokemon({
    pokedexId: 1,
    name: 'bulbasaur',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  });

  await pokemon1.save();

  const pokemon2 = new Pokemon({
    pokedexId: 56,
    name: 'mankey',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png',
  });

  await pokemon2.save();

  const user = new User({
    username: 'tester',
    // password: 'abc123'
    password: '$2b$10$p1SSYtAuXA8zG3R0NwgC2.nkqaLTlmZ8sBbE4QzyXfelkYfmMqS0K'
  })

  await user.save();
};

module.exports = { connect, seed };

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const Pokemon = require('../models/pokemon');

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
    pokemonId: 1,
    name: 'bulbasaur',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  });

  await pokemon1.save();

  const pokemon2 = new Pokemon({
    pokemonId: 56,
    name: 'mankey',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png',
  });

  await pokemon2.save();
};

module.exports = { connect, seed };

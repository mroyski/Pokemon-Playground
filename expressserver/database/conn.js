const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, { dbName: 'pokemonDb' });
  console.log(`MongoDB successfully connected to ${mongoUri}`);
};

module.exports = { connect };
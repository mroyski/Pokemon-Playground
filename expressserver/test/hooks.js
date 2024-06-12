const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

exports.mochaHooks = {
  beforeAll: [
    async function () {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
    },
  ],

  afterAll: [
    async function () {
      await mongoose.disconnect();
      await mongoServer.stop();
    },
  ],
};

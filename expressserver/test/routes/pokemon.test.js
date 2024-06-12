require('dotenv-flow').config();
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const supertest = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const Pokemon = require('../../models/pokemon.js');
const User = require('../../models/user.js');
const PokemonRouter = require('../../routes/pokemon.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { JsonWebTokenError } = require('jsonwebtoken');

chai.use(sinonChai);
const expect = chai.expect;

const app = express();
app.use(express.json());
app.use('/pokemon', PokemonRouter);

let mongoServer;

describe('PokemonRouter', () => {
  let sandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterEach(async () => {
    sandbox.restore();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('GET /pokemon/captured', () => {
    it('should return a all captured pokemon for a user', async () => {
      const username = randomstring.generate(10);
      const password = randomstring.generate(10);
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await new User({
        username: username,
        password: hashedPassword,
      }).save();

      const pokemon1 = await new Pokemon({
        pokedexId: '1',
        name: 'bulbasaur',
        sprite: 'bulbasaur_sprite_url',
        user: user,
      }).save();

      const pokemon2 = await new Pokemon({
        pokedexId: '2',
        name: 'venasaur',
        sprite: 'venasaur_sprite_url',
        user: user,
      }).save();

      sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
        callback(null, { user: user });
      });

      const res = await supertest(app)
        .get('/pokemon/captured')
        .set('Authorization', 'Bearer mockToken')
        .send();

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('pokemon');
      expect(res.body).to.have.property('username', username);
      expect(res.body.pokemon.length).to.equal(2);
    });
  });
});

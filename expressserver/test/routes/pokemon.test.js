require('dotenv-flow').config();
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const supertest = require('supertest');
const express = require('express');
const Pokemon = require('../../models/pokemon.js');
const PokemonRouter = require('../../routes/pokemon.js');
const jwt = require('jsonwebtoken');
const { buildUser } = require('../helper.js');

chai.use(sinonChai);
const expect = chai.expect;

const app = express();
app.use(express.json());
app.use('/pokemon', PokemonRouter);

describe('PokemonRouter', () => {
  afterEach(async () => {
    sinon.restore();
  });

  describe('GET /pokemon/captured', () => {
    it('should return a all captured pokemon for a user', async () => {
      const user = await buildUser();

      await new Pokemon({
        pokedexId: '1',
        name: 'bulbasaur',
        sprite: 'bulbasaur_sprite_url',
        user: user,
      }).save();

      await new Pokemon({
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
      expect(res.body).to.have.property('username', user.username);
      expect(res.body.username).to.equal(user.username);
      expect(res.body).to.have.property('pokemon');
      expect(res.body.pokemon.length).to.equal(2);
    });
  });

  describe('GET /pokemon/captured/:id', () => {
    it('should return pokemon by ID for a user', async () => {
      const user = await buildUser();

      const captured = await new Pokemon({
        pokedexId: '1',
        name: 'bulbasaur',
        sprite: 'bulbasaur_sprite_url',
        user: user,
      }).save();

      sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
        callback(null, { user: user });
      });

      const res = await supertest(app)
        .get(`/pokemon/captured/${captured._id}`)
        .set('Authorization', 'Bearer mockToken')
        .send();

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('_id');
      expect(res.body._id).to.equal(captured.id);
    });
  });

  describe('GET /pokemon/catch', () => {
    it('should add pokemon to users list of captured pokemon', async () => {
      const user = await buildUser();

      sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
        callback(null, { user: user });
      });

      let usersPokemon = await Pokemon.find({ user: user });
      expect(usersPokemon).to.be.empty;

      await supertest(app)
        .post('/pokemon/catch')
        .set('Authorization', 'Bearer mockToken')
        .send({
          pokedexId: '1',
          name: 'bulbasaur',
          sprite: 'bulbasaur_sprite_url',
          user: user,
        })
        .expect(200);

      usersPokemon = await Pokemon.find({ user: user });
      expect(usersPokemon.length).to.equal(1);
    });
  });

  describe('GET /pokemon/delete/:id', () => {
    it('should add pokemon to users list of captured pokemon', async () => {
      const user = await buildUser();

      const pokemonToDelete = await new Pokemon({
        pokedexId: '1',
        name: 'bulbasaur',
        sprite: 'bulbasaur_sprite_url',
        user: user,
      }).save();

      sinon.stub(jwt, 'verify').callsFake((token, secret, callback) => {
        callback(null, { user: user });
      });

      let usersPokemon = await Pokemon.find({ user: user });
      expect(usersPokemon.length).to.equal(1);

      await supertest(app)
        .delete(`/pokemon/delete/${pokemonToDelete.id}`)
        .set('Authorization', 'Bearer mockToken')
        .send()
        .expect(200);

      usersPokemon = await Pokemon.find({ user: user });
      expect(usersPokemon).to.be.empty;
    });
  });
});

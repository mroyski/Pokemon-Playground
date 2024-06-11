require('dotenv-flow').config();
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const supertest = require('supertest');
const express = require('express');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const User = require('../../models/user.js');
const AuthRouter = require('../../routes/auth.js');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(sinonChai);
const expect = chai.expect;

const app = express();
app.use(express.json());
app.use('/auth', AuthRouter);

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('AuthRouter', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('POST /auth/login', () => {
    it('should return a token for valid credentials', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const hashedPassword = await bcrypt.hash(password, 10);

      await new User({
        username: username,
        password: hashedPassword,
      }).save();

      const res = await supertest(app)
        .post('/auth/login')
        .send({ username, password });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('username', username);
    });

    it('should return 400 for invalid username', async () => {
      const username = 'invaliduser';
      const password = 'invalidpassword';

      const res = await supertest(app)
        .post('/auth/login')
        .send({ username: username, password: password });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'message',
        'Invalid username or password'
      );
    });

    it('should return 400 for invalid password', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const hashedPassword = await bcrypt.hash(password, 10);
      const wrongpassword = 'wrongpassword';

      await new User({
        username: username,
        password: hashedPassword,
      }).save();

      const res = await supertest(app)
        .post('/auth/login')
        .send({ username: username, password: wrongpassword });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'message',
        'Invalid username or password'
      );
    });

    it('should return 500 for internal server error', async () => {
      sandbox.stub(User, 'findOne').rejects(new Error('DB error'));

      const res = await supertest(app)
        .post('/auth/login')
        .send({ username: 'testuser', password: 'password123' });

      expect(res.status).to.equal(500);
      expect(res.body).to.have.property('message', 'Internal server error');
    });
  });

  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const username = randomstring.generate(10);

      const res = await supertest(app)
        .post('/auth/register')
        .send({ username: username, password: 'password123' });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property(
        'message',
        'User registered successfully'
      );
      expect(res.body).to.have.property('user');
      const user = await User.findOne({username: username})
      expect(user).to.not.be.null;
    });

    //   it('should return 400 for existing username', async () => {
    //     sandbox.stub(User, 'findOne').resolves({ username: 'existinguser' });

    //     const res = await supertest(app)
    //       .post('/auth/register')
    //       .send({ username: 'existinguser', password: 'password123' });

    //     expect(res.status).to.equal(400);
    //     expect(res.body).to.have.property('message', 'Username already taken');
    //   });

    //   it('should return 500 for internal server error', async () => {
    //     sandbox.stub(User, 'findOne').rejects(new Error('DB error'));

    //     const res = await supertest(app)
    //       .post('/auth/register')
    //       .send({ username: 'newuser', password: 'password123' });

    //     expect(res.status).to.equal(500);
    //     expect(res.body).to.have.property('message', 'Internal server error');
    //   });
  });
});

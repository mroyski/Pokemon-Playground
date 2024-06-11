require('dotenv-flow').config();

const Args = require('pixl-args');
const AuthRouter = require('./routes/auth.js');
const PokemonRouter = require('./routes/pokemon.js');
const { connect, connectInMemory, seed } = require('./database/config.js');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use('/api/pokemon', PokemonRouter);
app.use('/api/auth', AuthRouter);

const PORT = process.env.PORT || 8080;

let args = new Args();

if (args.get('in-memory-db')) {
  connectInMemory();
} else connect();

app.listen(PORT, () => console.log('Server started'));

require('dotenv').config();

const PokemonRouter = require('./routes/pokemon.js');
const { connect, seed } = require('./database/config.js');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));
app.use('/api/pokemon', PokemonRouter);

const PORT = process.env.PORT || 8080;

connect()
  .then(seed())
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => console.log('Server started'));

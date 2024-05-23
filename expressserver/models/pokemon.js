const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  pokemonId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sprite: {
    type: String,
    required: true,
  },
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;

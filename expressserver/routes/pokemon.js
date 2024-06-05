const axios = require('axios');
const PokemonRouter = require('express').Router();
const Pokemon = require('../models/pokemon.js');

const POKEMON_API_URL = process.env.POKEMON_API_URL;

// Get all captured pokemon
PokemonRouter.get('/captured', async (req, res) => {
  const { user } = req.params;

  Pokemon.find({ user: user })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// Get Captured Pokemon details
PokemonRouter.get('/captured/:id', async (req, res) => {
  const { id } = req.params;

  Pokemon.findById(id)
    .then((pokemon) => {
      res.json(pokemon);
    })
    .catch((error) => {
      res.json({ error });
    });
});

// Catch a Pokemon
PokemonRouter.post('/catch', async (req, res) => {
  try {
    const pokemon = new Pokemon({
      pokedexId: req.body.pokedexId,
      name: req.body.name,
      sprite: req.body.sprite,
    });

    await pokemon.save();
    res.json(pokemon);
  } catch (error) {
    res.json({ error });
  }
});

// // Get Pokemon details via external API
// PokemonRouter.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const response = await axios.get(`${POKEMON_API_URL}/pokemon/${id}`);
//     const pokemonData = response.data;
//     const pokemon = {
//       name: pokemonData.name,
//       sprite: pokemonData.sprites.front_default,
//       stats: pokemonData.stats,
//     };

//     res.json(pokemon);
//   } catch (error) {
//     console.error('Error fetching Pokemon data:', error);
//     res.status(500).json({ error: 'Failed to fetch Pokemon data' });
//   }
// });

module.exports = PokemonRouter;

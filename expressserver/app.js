require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();

const POKEMON_API_URL = process.env.POKEMON_API_URL;
const PORT = process.env.PORT || 8080;

const capturedPokemon = [
  {
    id: 1,
    pokemonId: 50,
    name: 'diglett',
  },
  {
    id: 2,
    pokemonId: 79,
    name: 'slowpoke',
  },
];

const findCapturedPokemonById = (id) => {
  return capturedPokemon.find((p) => {
    return p.id === id;
  });
};

app.listen(PORT, () => console.log('Server started'));

app.use(express.static('build'));

// ROUTES ========================================================
// Get all captured pokemon
app.get('/api/pokemon/captured', async (req, res) => {
  try {
    res.json(capturedPokemon);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    res.status(500).json({ error: 'Failed to fetch Pokemon data' });
  }
});


// Get Captured Pokemon details via external API
app.get('/api/pokemon/captured/:id', async (req, res) => {
  let { id } = req.params;
  pokemonId = parseInt(id);

  const findPokemon = findCapturedPokemonById(pokemonId);

  try {
    const response = await axios.get(
      `${POKEMON_API_URL}/pokemon/${findPokemon.pokemonId}`
    );
    const pokemonData = response.data;
    const pokemon = {
      name: pokemonData.name,
      sprite: pokemonData.sprites.front_default,
      stats: pokemonData.stats,
    };

    res.json(pokemon);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    res.status(500).json({ error: 'Failed to fetch Pokemon data' });
  }
});

// Get Pokemon details via external API
app.get('/api/pokemon/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${POKEMON_API_URL}/pokemon/${id}`);
    const pokemonData = response.data;
    const pokemon = {
      name: pokemonData.name,
      sprite: pokemonData.sprites.front_default,
      stats: pokemonData.stats,
    };

    res.json(pokemon);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    res.status(500).json({ error: 'Failed to fetch Pokemon data' });
  }
});

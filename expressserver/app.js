require('dotenv').config();

const Pokemon = require('./models/pokemon.js');
const { connect, seed } = require('./database/config.js');
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const POKEMON_API_URL = process.env.POKEMON_API_URL;
const PORT = process.env.PORT || 8080;

// TODO: Set up dynamic ID
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

connect()
  .then(() => {
    seed();
  })
  .then(() => {
    app.listen(PORT, () => console.log('Server started'));
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.static('build'));

// ROUTES ========================================================
// Get all captured pokemon
app.get('/api/pokemon/captured', async (req, res) => {
  Pokemon.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// Get Captured Pokemon details
app.get('/api/pokemon/captured/:id', async (req, res) => {
  let { id } = req.params;
  pokemonId = parseInt(id);

  Pokemon.findById(id)
    .then((pokemon) => {
      res.json(pokemon);
    })
    .catch((error) => {
      res.json({ error });
    });
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

app.post('/api/pokemon/catch', async (req, res) => {
  try {
    const pokemon = new Pokemon({
      pokemonId: req.body.id,
      name: req.body.name,
      sprite: req.body.sprite,
    });

    await pokemon.save();
    res.json(pokemon);
  } catch (error) {
    res.json({ error });
  }
});

// ROUTE GRAVEYARD >:D
// Get all captured pokemon
// app.get('/api/pokemon/captured', async (req, res) => {
//   try {
//     res.json(capturedPokemon);
//   } catch (error) {
//     console.error('Error fetching Pokemon data:', error);
//     res.status(500).json({ error: 'Failed to fetch Pokemon data' });
//   }
// });

// Add Pokemon to captured list
// app.post('/api/pokemon/catch', async (req, res) => {
//   console.log('Caught Pokemon:', req.body);
//   capturedPokemon.push({
//     // TODO: Set up dynamic ID
//     id: capturedPokemon.length + 1,
//     pokemonId: req.body.id,
//     name: req.body.name,
//   });

//   res.send('ok');
// });

// app.get('/api/pokemon/captured/:id', async (req, res) => {
//   let { id } = req.params;
//   pokemonId = parseInt(id);

//   const findPokemon = findCapturedPokemonById(pokemonId);

//   try {
//     const response = await axios.get(
//       `${POKEMON_API_URL}/pokemon/${findPokemon.pokemonId}`
//     );
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

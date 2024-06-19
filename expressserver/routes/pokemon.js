const PokemonRouter = require('express').Router();
const Pokemon = require('../models/pokemon.js');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = decoded.user;
    next();
  });
};

// Get all captured pokemon
PokemonRouter.get('/captured', verifyToken, async (req, res) => {
  Pokemon.find({ user: req.user })
    .then((pokemon) => {
      res.json({ pokemon: pokemon, username: req.user.username });
    })
    .catch((error) => {
      res.json({ error });
    });
});

// Get Captured Pokemon details
PokemonRouter.get('/captured/:id', verifyToken, async (req, res) => {
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
PokemonRouter.post('/catch', verifyToken, async (req, res) => {
  try {
    const pokemon = new Pokemon({
      pokedexId: req.body.pokedexId,
      name: req.body.name,
      sprite: req.body.sprite,
      user: req.user,
    });

    await pokemon.save();
    res.json(pokemon);
  } catch (error) {
    res.json({ error });
  }
});

// Delete a Captured Pokemon
PokemonRouter.delete('/delete/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    Pokemon.deleteOne({ _id: id }).then(
      res.status(200).send({ deleted: true })
    );
  } catch (error) {
    res.json({ error });
  }
});

module.exports = PokemonRouter;

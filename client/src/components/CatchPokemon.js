import { useState } from 'react';
import { Link } from 'react-router-dom';

/*
    1. click button to trigger a pokemon to spawn - DONE
    2. pokemon details are shown - DONE
    3. click button to throw a pokeball
    4. pokeball will not capture every time, maybe 50% to start?
    5. pokemon is added to captured pokemon list (in memory for now)
*/

const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

const randomPokemonNumber = () => {
  return Math.floor(Math.random() * 150);
};

const pokemonInfo = (pokemon) => {
  const pokemonTypes = pokemon.types.map((t) => t.type.name).join('/');

  return (
    <ul>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <li>{pokemon.name}</li>
      <li>{pokemonTypes}</li>
    </ul>
  );
};

const CatchPokemon = () => {
  const [pokemon, setPokemon] = useState();

  const findPokemon = (id) => {
    fetch(`${POKEMON_API_URL}/pokemon/${randomPokemonNumber()}`)
      .then((res) => res.json())
      .then((data) => {
        const pokemon = {
          id: data.id,
          name: data.name,
          sprite: data.sprites.front_default,
          stats: data.stats,
          types: data.types,
          catpured: false,
        };

        setPokemon(pokemon);
      });
  };

  const catchPokemon = () => {
    if (!pokemon) {
      alert('Find a Pokemon to catch!');
      return;
    }

    if (pokemon.captured) {
      alert('Pokemon already captured!');
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprite,
      }),
    };

    fetch('/api/pokemon/catch', options).then(
      setPokemon({ ...pokemon, captured: true })
    );
  };

  return (
    <>
      <Link to={'/captured/'}>Captured Pokemon</Link>
      <button onClick={findPokemon}>Find Pokemon</button>
      <button onClick={catchPokemon}>Throw Pokeball</button>
      {pokemon && pokemonInfo(pokemon)}
    </>
  );
};

export default CatchPokemon;

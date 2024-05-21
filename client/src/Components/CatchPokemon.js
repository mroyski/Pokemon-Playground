import { useEffect, useState } from 'react';

/*
    1. click button to trigger a pokemon to spawn
    2. pokemon details are shown
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

  const findPokemon = async (id) => {
    fetch(`${POKEMON_API_URL}/pokemon/${randomPokemonNumber()}`)
      .then((res) => res.json())
      .then((data) => {
        const pokemon = {
          name: data.name,
          sprite: data.sprites.front_default,
          stats: data.stats,
          types: data.types,
        };

        setPokemon(pokemon);
      });
  };

  return (
    <>
      <button onClick={findPokemon}>Find Pokemon</button>
      {pokemon && pokemonInfo(pokemon)}
    </>
  );
};

export default CatchPokemon;

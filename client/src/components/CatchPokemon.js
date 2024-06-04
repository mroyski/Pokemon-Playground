import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFindPokemon } from '../lib/hooks';
import LogContext from '../lib/LogContext';

/*
    1. click button to trigger a pokemon to spawn - DONE
    2. pokemon details are shown - DONE
    3. click button to throw a pokeball - DONE
    4. pokemon is added to captured pokemon list (in memory for now) - DONE
    5. implement useQuery to cache calls to pokemon api - DONE
    6. pokeball will not capture every time, maybe 50% to start?
    7. Show how many pokemon you have total after capture?
*/

const randomPokemonNumber = () => {
  return Math.floor(Math.random() * 150 + 1);
};

const pokemonInfo = (pokemon) => {
  if (!pokemon) {
    return (
      <ul>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"
          alt="no-pokemon"
        />
        <li>?</li>
        <li>?</li>
      </ul>
    );
  }
  const pokemonTypes = pokemon.types.map((t) => t.type.name).join('/');

  return (
    <ul>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <li>{pokemon.name}</li>
      <li>{pokemonTypes}</li>
    </ul>
  );
};

const CatchPokemon = () => {
  const [randomId, setRandomId] = useState();
  const [captured, setCaptured] = useState(false);
  const { data: pokemon, refetch } = useFindPokemon(randomId);
  const { setLogs } = useContext(LogContext);

  useEffect(() => {
    if (randomId) refetch();
  }, [refetch, randomId]);

  const handleFindPokemon = () => {
    setRandomId(randomPokemonNumber());
    setCaptured(false);
  };

  const catchPokemon = () => {
    if (!pokemon) {
      alert('Find a Pokemon to catch!');
      return;
    }

    if (captured) {
      alert('Pokemon already captured!');
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pokedexId: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
      }),
    };

    // TODO: extract this logic
    setLogs((prevLogs) => [
      { timestamp: Date.now(), data: `captured a ${pokemon.name}!` },
      ...prevLogs.slice(0, 5),
    ]);

    fetch('/api/pokemon/catch', options).then(setCaptured(true));
  };

  return (
    <>
      <Link to={'/captured/'}>Captured Pokemon</Link>
      <button onClick={handleFindPokemon}>Find Pokemon</button>
      <button onClick={catchPokemon}>Throw Pokeball</button>
      {pokemonInfo(pokemon)}
    </>
  );
};

export default CatchPokemon;

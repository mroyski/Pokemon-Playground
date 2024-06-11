import { useEffect, useState } from 'react';
import { useFindPokemon } from '../lib/hooks';
import { useLogs } from '../lib/LogContext';
import { useAuth } from '../lib/AuthContext';

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

const pokemonInfo = (pokemon, captured) => {
  if (!pokemon) {
    return (
      <ul style={{ listStyleType: 'none' }}>
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
    <ul style={{ listStyleType: 'none' }}>
      <img
        style={{ width: '96px' }}
        src={
          captured
            ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
            : pokemon.sprites.front_default
        }
        alt={pokemon.name}
      />
      <li>{pokemon.name}</li>
      <li>{pokemonTypes}</li>
    </ul>
  );
};

const CatchPokemon = () => {
  const [randomId, setRandomId] = useState();
  const [captured, setCaptured] = useState(false);
  const { data: pokemon, refetch } = useFindPokemon(randomId);
  const { addCapturedLog } = useLogs();
  const { logout } = useAuth();

  useEffect(() => {
    if (randomId) refetch();
  }, [refetch, randomId]);

  const handleFindPokemon = () => {
    setRandomId(randomPokemonNumber());
    setCaptured(false);
  };

  const handleCatchPokemon = () => {
    if (!pokemon) {
      alert('Find a Pokemon to catch!');
      return;
    }

    if (captured) {
      alert('Pokemon already captured!');
      return;
    }

    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        pokedexId: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.front_default,
      }),
    };

    // TODO: create custom fetch to handle unauthorized cases and logout
    // also need to add in captured pokemon list!
    fetch('/api/pokemon/catch', options)
      .then((res) => {
        if (res.status === 403) {
          logout();
          throw new Error('Unauthorized');
        }
      })
      .then(setCaptured(true))
      .then(addCapturedLog(pokemon.name))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button onClick={handleFindPokemon}>Find Pokemon</button>
      <button onClick={handleCatchPokemon}>Throw Pokeball</button>
      <p style={{ color: 'green', minHeight: '20px' }}>
        {captured && `You caught a ${pokemon.name}!`}
      </p>
      {pokemonInfo(pokemon, captured)}
    </>
  );
};

export default CatchPokemon;

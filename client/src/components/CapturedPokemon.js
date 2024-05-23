import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CapturedPokemon = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('/api/pokemon/captured')
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  }, []);

  return (
    <>
      <h1>Pokemon</h1>
      <h2>Count: {pokemon.length}</h2>
      {pokemon.map((item, index) => {
        return (
          <>
            <p>
              {index + 1}. {item.name}
            </p>
            <img src={item.sprite} alt={item.name} />
            <Link to={`/captured/${item._id}`}>Details</Link>
          </>
        );
      })}
    </>
  );
};

export default CapturedPokemon;

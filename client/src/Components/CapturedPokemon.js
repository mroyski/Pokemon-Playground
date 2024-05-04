import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CapturedPokemon = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('/api/pokemon/captured')
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setPokemon(data);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>Pokemon</h1>
          <h2>Count: {pokemon.length}</h2>
          {pokemon.map((item, index) => {
            return (
              <>
                <p>
                  {index + 1}. {item.name}
                </p>
                <Link to={`/captured/${item.id}`}>Details</Link>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default CapturedPokemon;

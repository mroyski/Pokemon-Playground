import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CapturedPokemon = () => {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/pokemon/captured/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  }, []);

  return (
    <>
      <h1>Pokemon</h1>
      <h2>Count: {pokemon.length}</h2>
      <ul>
        {pokemon.map((item) => {
          return (
            <li key={item.id || item._id}>
              <img src={item.sprite} alt={item.name} />
              <Link to={`/captured/${item.id || item._id}`}>Details</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CapturedPokemon;

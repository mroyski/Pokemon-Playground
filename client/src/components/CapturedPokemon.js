import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CapturedPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [username, setUsername] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/pokemon/captured', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data.pokemon);
        setUsername(data.username);
      });
  }, []);

  return (
    <>
      <h1>{`${username}'s Pokemon`}</h1>
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

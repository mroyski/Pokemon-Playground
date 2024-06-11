import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

const CapturedPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const { user, token, logout } = useAuth();

  useEffect(() => {
    fetch('/api/pokemon/captured', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 403) return logout('token expired');
        return res.json();
      })
      .then((data) => {
        setPokemon(data.pokemon);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token, logout]);

  return (
    <>
      <h1>{`${user}'s Pokemon`}</h1>
      <h2>Count: {pokemon.length}</h2>
      <ul style={{ listStyleType: 'none' }}>
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

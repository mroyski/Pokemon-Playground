import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

const CapturedPokemonDetails = () => {
  const [pokemon, setPokemon] = useState([]);
  const [released, setReleased] = useState(false);
  const { id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    fetch(`/api/pokemon/captured/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [id]);

  const handleRelease = async () => {
    try {
      const response = await fetch(`/api/pokemon/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setReleased(true);
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };

  return (
    <>
      <img src={pokemon.sprite} alt={pokemon.name} />
      <p>{pokemon.name}</p>
      <button
        style={{ backgroundColor: 'red', color: 'white' }}
        onClick={handleRelease}
      >
        Release
      </button>
      {released && <Navigate to="/captured" />}
    </>
  );
};

export default CapturedPokemonDetails;

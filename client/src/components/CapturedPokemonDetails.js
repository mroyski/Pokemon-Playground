import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CapturedPokemonDetails = () => {
  const [pokemon, setPokemon] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
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

  return <>{pokemon.name}</>;
};

export default CapturedPokemonDetails;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CapturedPokemonDetails = () => {
  const [pokemon, setPokemon] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/pokemon/captured/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [id]);

  return <>{pokemon.name}</>;
};

export default CapturedPokemonDetails;

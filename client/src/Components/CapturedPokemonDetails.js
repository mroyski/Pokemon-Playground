import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CapturedPokemonDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/captured/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setPokemon(data);
      });
  }, [id]);

  return <>{isLoading ? <p>Loading...</p> : <>{pokemon.name}</>}</>;
};

export default CapturedPokemonDetails;

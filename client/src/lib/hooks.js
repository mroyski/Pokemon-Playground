import { useQuery } from '@tanstack/react-query';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

export const useFindPokemon = (id) =>
  useQuery({
    enabled: false,
    queryKey: ['pokemon', id],
    queryFn: async () => {
      const data = await fetch(`${POKEMON_API_URL}/pokemon/${id}`);
      return data.json();
    },
  });

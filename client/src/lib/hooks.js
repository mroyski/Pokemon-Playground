import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2';

export const useFindPokemon = (id) =>
  useQuery({
    enabled: false,
    queryKey: ['pokemon', id],
    queryFn: () => {
      return fetch(`${POKEMON_API_URL}/pokemon/${id}`).then((res) =>
        res.json()
      );
    },
  });

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        window.localStorage.setItem(keyName, defaultValue);
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, newValue);
    } catch (err) {
      console.log(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

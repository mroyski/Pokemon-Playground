import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CapturedPokemon from './Components/CapturedPokemon';
import CapturedPokemonDetails from './Components/CapturedPokemonDetails';
import CatchPokemon from './Components/CatchPokemon';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CatchPokemon />,
  },
  {
    path: '/captured',
    element: <CapturedPokemon />,
  },
  {
    path: '/captured/:id',
    element: <CapturedPokemonDetails />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

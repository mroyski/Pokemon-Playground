import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './routes/root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CapturedPokemon from './Components/CapturedPokemon';
import CapturedPokemonDetails from './Components/CapturedPokemonDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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

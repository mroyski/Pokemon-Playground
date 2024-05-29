import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CapturedPokemon from './components/CapturedPokemon';
import CapturedPokemonDetails from './components/CapturedPokemonDetails';
import CatchPokemon from './components/CatchPokemon';
import Logs from './components/Logs';
import LogContext from './lib/LogContext';

const queryClient = new QueryClient();

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

const App = () => {
  const [logs, setLogs] = useState([
    'captured a mankey!',
    'captured a bulbasaur!',
  ]);

  const logContextValue = { logs, setLogs };

  return (
    <React.StrictMode>
      <LogContext.Provider value={logContextValue}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Logs logs={logs} />
        </QueryClientProvider>
      </LogContext.Provider>
    </React.StrictMode>
  );
};

export default App;

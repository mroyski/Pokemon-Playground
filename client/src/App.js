import React, { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CapturedPokemon from './components/CapturedPokemon';
import CapturedPokemonDetails from './components/CapturedPokemonDetails';
import CatchPokemon from './components/CatchPokemon';
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

// TODO: extract this to a component
const LogView = ({ logData }) => {
  return (
    <ul>
      {logData.slice(0, 5).map((log) => (
        <li>{log}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [logs, setLogs] = useState([
    'captured a mankey!',
    'captured a bulbasaur!',
  ]);
  
  const logValue = { logs, setLogs };

  return (
    <React.StrictMode>
      <LogContext.Provider value={logValue}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <LogView logData={logs} />
        </QueryClientProvider>
      </LogContext.Provider>
    </React.StrictMode>
  );
};

export default App;

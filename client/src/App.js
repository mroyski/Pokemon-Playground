import React from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './lib/AuthContext';
import { LogProvider } from './lib/LogContext';
import CapturedPokemon from './components/CapturedPokemon';
import CapturedPokemonDetails from './components/CapturedPokemonDetails';
import CatchPokemon from './components/CatchPokemon';
import Login from './components/Login';
import Logs from './components/Logs';
import Navbar from './components/Navbar';
import Register from './components/Register';
import './App.css';

const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
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
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

const App = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <LogProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Logs />
          </QueryClientProvider>
        </LogProvider>
      </AuthProvider>
    </React.StrictMode>
  );
};

export default App;

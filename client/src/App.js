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
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const queryClient = new QueryClient();

const AppLayout = () => {
  return (
    <div style={{ margin: 'auto', maxWidth: '550px' }}>
      <Navbar />
      <Outlet />
      <Logs />
    </div>
  );
};

const routes = [
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <CatchPokemon />
          </ProtectedRoute>
        ),
      },
      {
        path: '/captured',
        element: (
          <ProtectedRoute>
            <CapturedPokemon />
          </ProtectedRoute>
        ),
      },
      {
        path: '/captured/:id',
        element: (
          <ProtectedRoute>
            <CapturedPokemonDetails />
          </ProtectedRoute>
        ),
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
];

const App = () => {
  const router = createBrowserRouter(routes);

  return (
    <React.StrictMode>
      <LogProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </LogProvider>
    </React.StrictMode>
  );
};

export default App;
export { routes }; // Export routes for test use

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { LogProvider } from './lib/LogContext';
import App, { routes } from './App';

// Mock components
jest.mock('./components/CapturedPokemon', () => () => <div>Captured Pokemon</div>);
jest.mock('./components/CapturedPokemonDetails', () => () => <div>Captured Pokemon Details</div>);
jest.mock('./components/CatchPokemon', () => () => <div>Catch Pokemon</div>);
jest.mock('./components/Login', () => () => <div>Login</div>);
jest.mock('./components/Register', () => () => <div>Register</div>);
jest.mock('./components/Navbar', () => () => <div>Navbar</div>);
jest.mock('./components/Logs', () => () => <div>Logs</div>);

// Mock useAuth hook
jest.mock('./lib/AuthContext', () => {
  const originalModule = jest.requireActual('./lib/AuthContext');
  return {
    ...originalModule,
    useAuth: jest.fn(),
  };
});

const renderWithProviders = (ui, { route = '/' } = {}) => {
  const queryClient = new QueryClient();
  const router = createMemoryRouter(routes, { initialEntries: [route] });

  return render(
    <LogProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}>{ui}</RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </LogProvider>
  );
};

describe('App component', () => {
  beforeEach(() => {
    // Default mock implementation
    useAuth.mockReturnValue({ loaded: true, token: 'fake-token', user: { name: 'John Doe' } });
  });

  test('renders Navbar and Logs by default', () => {
    renderWithProviders(<App />, { route: '/' });

    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Logs')).toBeInTheDocument();
  });

//   test('renders CatchPokemon component for / route when authenticated', async () => {
//     renderWithProviders(<App />, { route: '/' });

//     await waitFor(() => {
//       screen.debug(); // Debugging line to show current state of rendered DOM
//       expect(screen.getByText('Catch Pokemon')).toBeInTheDocument();
//     });
//   });

//   test('renders CapturedPokemon component for /captured route when authenticated', async () => {
//     renderWithProviders(<App />, { route: '/captured' });

//     await waitFor(() => {
//       screen.debug(); // Debugging line to show current state of rendered DOM
//       expect(screen.getByText('Captured Pokemon')).toBeInTheDocument();
//     });
//   });

//   test('renders CapturedPokemonDetails component for /captured/:id route when authenticated', async () => {
//     renderWithProviders(<App />, { route: '/captured/1' });

//     await waitFor(() => {
//       screen.debug(); // Debugging line to show current state of rendered DOM
//       expect(screen.getByText('Captured Pokemon Details')).toBeInTheDocument();
//     });
//   });

//   test('redirects to login for protected routes when not authenticated', async () => {
//     useAuth.mockReturnValue({ loaded: true, token: null, user: null });

//     renderWithProviders(<App />, { route: '/' });

//     await waitFor(() => {
//       screen.debug(); // Debugging line to show current state of rendered DOM
//       expect(screen.getByText('Login')).toBeInTheDocument();
//     });
//   });

//   test('renders Login component for /login route', async () => {
//     renderWithProviders(<App />, { route: '/login' });

//     await waitFor(() => {
//       screen.debug(); // Debugging line to show current state of rendered DOM
//       expect(screen.getByText('Login')).toBeInTheDocument();
//     });
//   });

//   test('renders Register component for /register route', async () => {
//     renderWithProviders(<App />, { route: '/register' });

//     await waitFor(() => {
//       screen.debug(); // Debugging line to show current state of rendered DOM
//       expect(screen.getByText('Register')).toBeInTheDocument();
//     });
//   });
});

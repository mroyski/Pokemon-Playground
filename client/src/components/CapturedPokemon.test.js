import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import CapturedPokemon from './CapturedPokemon';

jest.mock('../lib/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('CapturedPokemon Component', () => {
  const mockUser = 'Ash';

  beforeEach(() => {
    useAuth.mockReturnValue({
      user: mockUser,
      token: 'test-token',
      logout: jest.fn(),
    });
  });

  test("renders user's pokemon and count", async () => {
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({
        pokemon: [
          { id: '1', name: 'Pikachu', sprite: 'pikachu.png' },
          { id: '2', name: 'Bulbasaur', sprite: 'bulbasaur.png' },
        ],
      }),
      ok: true,
    });

    render(
      <Router>
        <CapturedPokemon />
      </Router>
    );

    // Verify initial loading state
    expect(screen.getByText(`${mockUser}'s Pokemon`)).toBeInTheDocument();
    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    // Wait for API call to complete and update UI
    await waitFor(() => {
      expect(screen.getByText('Count: 2')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });
  });
});

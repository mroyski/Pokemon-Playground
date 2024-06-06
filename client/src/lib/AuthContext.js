import { createContext, useContext, useMemo, useState } from 'react';
import { useLogs } from './LogContext';
import { useLocalStorage } from './hooks';

// TODO: use useLocalStorage for handling localstorage operations

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const { clearLogs } = useLogs();

  const login = async ({ username, password }) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    try {
      const response = await fetch('/api/auth/login', options);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      clearLogs();
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setUser(data.username);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    clearLogs();
  };

  const value = useMemo(
    () => ({
      login,
      logout,
      user,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLogs } from './LogContext';
import { useLocalStorage } from './hooks';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null);
  const [token, setToken] = useLocalStorage('token', null);
  const [loaded, setLoaded] = useState(false);
  const { clearLogs } = useLogs();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    setToken(storedToken);
    setUser(user);
    setLoaded(true);
  }, []);

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
      setUser(data.username);
      setToken(data.token);
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearLogs();
  };

  const value = useMemo(
    () => ({
      login,
      logout,
      loaded,
      token,
      user,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

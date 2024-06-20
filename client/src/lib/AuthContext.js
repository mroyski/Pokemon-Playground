import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { useLogs } from './LogContext';
import { useLocalStorage } from './hooks';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', localStorage.getItem('user'));
  const [token, setToken] = useLocalStorage(
    'token',
    localStorage.getItem('token')
  );
  const { clearLogs } = useLogs();

  useEffect(() => {
    setToken(token);
    setUser(user);
  }, [setToken, setUser, token, user]);

  const login = useCallback(
    async ({ username, password }) => {
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
    },
    [setUser, setToken, clearLogs]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    clearLogs();
  }, [setToken, setUser, clearLogs]);

  const value = useMemo(
    () => ({
      login,
      logout,
      token,
      user,
    }),
    [login, logout, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

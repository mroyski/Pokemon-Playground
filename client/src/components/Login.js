import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, error } = await login({ username, password });
    if (success) setLoggedIn(true);
    else setErrorMessage(error);
  };

  return (
    <>
      <h1>Login</h1>
      <p style={{ color: 'red', minHeight: '20px' }}>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {loggedIn && <Navigate to="/captured" />}
    </>
  );
};

export default Login;

import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registered, setRegistered] = useState(false);

  const register = async (e) => {
    e.preventDefault();
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
      const response = await fetch('/api/auth/register', options);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      setErrorMessage(null);
      setRegistered(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <form onSubmit={register}>
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
        <button type="submit">Register</button>
      </form>
      {registered && <Navigate to="/login" />}
    </>
  );
};

export default Register;

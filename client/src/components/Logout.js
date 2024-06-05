import { useContext } from 'react';
import { LogContext } from '../lib/LogContext';
import { Link } from 'react-router-dom';

const Logout = () => {
  const { setLogs } = useContext(LogContext);
  const logout = () => {
    setLogs([]);
    localStorage.removeItem('token');
  };

  return (
    <button>
      <Link onClick={logout} to="/login" style={{ textDecoration: 'none' }}>
        Logout
      </Link>
    </button>
  );
};

export default Logout;

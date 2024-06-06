import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button>
      <Link
        onClick={handleLogout}
        to="/login"
        style={{ textDecoration: 'none' }}
      >
        Logout
      </Link>
    </button>
  );
};

export default Logout;

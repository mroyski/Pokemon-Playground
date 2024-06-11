import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { loaded, token, user } = useAuth();
  if (!loaded) return null;
  if (!token || !user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;

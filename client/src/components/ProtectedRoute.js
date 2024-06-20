import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, user } = useAuth();
  if (!token || !user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;

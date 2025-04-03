import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/" />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/unauthorized" />;
  
  return <Outlet />;
};

export default ProtectedRoute;

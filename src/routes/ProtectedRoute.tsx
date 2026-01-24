import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hook';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, token } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

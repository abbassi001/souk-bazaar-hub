
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: 'buyer' | 'seller' | null;
};

const ProtectedRoute = ({ children, requiredRole = null }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    } else if (!isLoading && user && requiredRole && user.role !== requiredRole) {
      navigate(user.role === 'seller' ? '/dashboard' : '/products');
    }
  }, [isLoading, user, navigate, requiredRole]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-souk-700 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;

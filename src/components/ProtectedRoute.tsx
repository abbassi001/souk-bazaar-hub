import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: 'buyer' | 'seller' | null;
};

const ProtectedRoute = ({ children, requiredRole = null }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // User is not logged in, redirect to login
        toast({
          title: "Accès restreint",
          description: "Vous devez être connecté pour accéder à cette page.",
          variant: "destructive",
        });
        
        // Keep the original path in state so we can redirect back after login
        navigate('/login', { state: { from: location.pathname } });
      } else if (requiredRole && user.role !== requiredRole) {
        // User doesn't have the required role
        toast({
          title: "Accès non autorisé",
          description: `Cette page est réservée aux ${requiredRole === 'seller' ? 'vendeurs' : 'acheteurs'}.`,
          variant: "destructive",
        });
        
        // Redirect based on role
        navigate(user.role === 'seller' ? '/dashboard' : '/products');
      } else {
        // User is authorized
        setIsAuthorized(true);
      }
    }
  }, [isLoading, user, navigate, requiredRole, location.pathname]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-souk-700 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedRoute;

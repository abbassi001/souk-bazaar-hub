
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthTabs from '@/components/auth/AuthTabs';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import AuthSwitcher from '@/components/auth/AuthSwitcher';
import EmailConfirmationDialog from '@/components/auth/EmailConfirmationDialog';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect based on role
    if (user) {
      navigate(user.role === 'seller' ? '/dashboard' : '/products');
    }
  }, [user, navigate]);

  const handleSignupSuccess = () => {
    setIsInfoDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsInfoDialogOpen(false);
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-souk-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <h1 className="text-2xl font-bold text-souk-900 mb-6 text-center">
              {isLogin ? 'Connexion' : 'Créer un compte'}
            </h1>
            
            <AuthTabs 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} 
              isSubmitting={isSubmitting || isLoading} 
            />
            
            {isLogin ? (
              <LoginForm isSubmitting={isSubmitting || isLoading} />
            ) : (
              <SignupForm 
                isSubmitting={isSubmitting || isLoading} 
                onSignupSuccess={handleSignupSuccess} 
              />
            )}
            
            <AuthSwitcher 
              isLogin={isLogin} 
              setIsLogin={setIsLogin} 
              isSubmitting={isSubmitting || isLoading} 
            />
          </div>
        </div>
      </div>
      
      <EmailConfirmationDialog 
        isOpen={isInfoDialogOpen} 
        onOpenChange={setIsInfoDialogOpen} 
        onClose={handleDialogClose} 
      />
      
      <Footer />
    </div>
  );
};

export default Login;

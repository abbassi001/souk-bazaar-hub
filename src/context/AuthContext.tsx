
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { AuthContextType, UserData } from '@/types/auth';
import { fetchUserProfile } from '@/hooks/use-profile';
import { useAuthOperations } from '@/hooks/use-auth-operations';

// Create a context with default value undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { signUp, signIn, signOut } = useAuthOperations();

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session) {
          const userData = await fetchUserProfile(session.user.id);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        const userData = await fetchUserProfile(session.user.id);
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Comment out the automatic redirection to allow dashboard development
  // useEffect(() => {
  //   if (user && !isLoading) {
  //     // After login and profile fetch, redirect based on role
  //     navigate(user.role === 'seller' ? '/dashboard' : '/products');
  //   }
  // }, [user, isLoading, navigate]);

  const contextValue: AuthContextType = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

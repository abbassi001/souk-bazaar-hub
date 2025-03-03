
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import type { User, Session } from '@supabase/supabase-js';

type UserRole = 'buyer' | 'seller';

interface UserData {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

interface AuthContextType {
  user: UserData | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session ? getUserFromSession(session) : null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session ? getUserFromSession(session) : null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUserFromSession = (session: Session): UserData => {
    const role = localStorage.getItem('userRole') as UserRole || 'buyer';
    const name = localStorage.getItem('userName') || undefined;
    
    return {
      id: session.user.id,
      email: session.user.email || '',
      role,
      name
    };
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          }
        }
      });

      if (error) throw error;

      localStorage.setItem('userName', name);
      localStorage.setItem('userRole', role);
      
      toast({
        title: "Inscription réussie!",
        description: "Votre compte a été créé avec succès.",
        duration: 5000
      });
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Get user metadata
      const userData = data.user?.user_metadata;
      if (userData) {
        localStorage.setItem('userName', userData.name || 'User');
        localStorage.setItem('userRole', userData.role || 'buyer');
      }

      toast({
        title: "Connexion réussie!",
        description: "Vous êtes maintenant connecté.",
        duration: 3000
      });

      // Redirect based on role
      const role = userData?.role || localStorage.getItem('userRole') || 'buyer';
      navigate(role === 'seller' ? '/dashboard' : '/products');
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      localStorage.removeItem('isLoggedIn');
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
        duration: 3000
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
        duration: 5000
      });
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

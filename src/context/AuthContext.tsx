
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
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session) {
          await fetchUserProfile(session.user.id);
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
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        setUser(null);
      } else if (data) {
        setUser({
          id: data.id,
          email: data.email,
          role: data.role as UserRole,
          name: data.name
        });
      } else {
        // If profile doesn't exist yet but user exists in auth
        const { data: userData } = await supabase.auth.getUser();
        if (userData.user) {
          // Use metadata from auth user
          const metadata = userData.user.user_metadata;
          const email = userData.user.email || '';
          
          try {
            // Insert the profile
            await supabase.from('profiles').insert({
              id: userId,
              email: email,
              role: (metadata?.role as UserRole) || 'buyer',
              name: metadata?.name || 'User'
            });
            
            // Set user with metadata
            setUser({
              id: userId,
              email: email,
              role: (metadata?.role as UserRole) || 'buyer',
              name: metadata?.name || 'User'
            });
          } catch (insertError) {
            console.error('Error creating profile:', insertError);
            setUser(null);
          }
        }
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setIsLoading(true);
      
      // Validate email before attempting signup
      if (!email || !email.includes('@') || !email.includes('.')) {
        throw new Error("Veuillez saisir une adresse email valide");
      }
      
      // Check password strength
      if (password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères");
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          },
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (error) throw error;
      
      toast({
        title: "Inscription réussie!",
        description: "Votre compte a été créé avec succès. Veuillez vérifier votre email pour confirmer votre inscription.",
        duration: 5000
      });
      
      return;
      
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle specific error messages
      let errorMessage = "Une erreur est survenue lors de l'inscription.";
      
      if (error.message.includes("User already registered")) {
        errorMessage = "Cet email est déjà utilisé. Veuillez vous connecter ou utiliser un autre email.";
      } else if (error.message.includes("invalid")) {
        errorMessage = "Email invalide. Veuillez vérifier votre adresse email.";
      }
      
      toast({
        title: "Erreur d'inscription",
        description: errorMessage,
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
      
      if (!email || !password) {
        throw new Error("Veuillez remplir tous les champs");
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Handle specific error types
        if (error.message.includes("Email not confirmed")) {
          toast({
            title: "Email non confirmé",
            description: "Veuillez vérifier votre email et cliquer sur le lien de confirmation.",
            variant: "destructive",
            duration: 5000
          });
          return;
        }
        throw error;
      }

      toast({
        title: "Connexion réussie!",
        description: "Vous êtes maintenant connecté.",
        duration: 3000
      });

      // Redirect based on role (from the profile data)
      if (data?.user) {
        await fetchUserProfile(data.user.id);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      
      let errorMessage = "Email ou mot de passe incorrect.";
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou mot de passe incorrect.";
      }
      
      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
        duration: 3000
      });
      
      setUser(null);
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Erreur de déconnexion",
        description: error.message || "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
        duration: 5000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect user based on role when user data is loaded
  useEffect(() => {
    if (user && !isLoading) {
      // After login and profile fetch, redirect based on role
      navigate(user.role === 'seller' ? '/dashboard' : '/products');
    }
  }, [user, isLoading, navigate]);

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


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types/auth';
import { fetchUserProfile } from '@/hooks/use-profile';

export function useAuthOperations() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
          throw error;
        }
        throw error;
      }

      toast({
        title: "Connexion réussie!",
        description: "Vous êtes maintenant connecté.",
        duration: 3000
      });

      return data;
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
      throw error;
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

  return {
    isLoading,
    signUp,
    signIn,
    signOut
  };
}


import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginFormProps {
  isSubmitting: boolean;
}

const LoginForm = ({ isSubmitting }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || localLoading) return;
    
    try {
      setLocalLoading(true);
      await signIn(email, password);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion.",
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setLocalLoading(false);
    }
  };

  // Determine if the button should be in loading state
  const buttonLoading = isSubmitting || localLoading;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="login-email" className="block text-sm font-medium text-souk-700">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-souk-500">
            <Mail size={18} />
          </div>
          <Input
            type="email"
            id="login-email"
            className="pl-10 w-full"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={buttonLoading}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="login-password" className="block text-sm font-medium text-souk-700">
            Mot de passe
          </label>
          <a href="/forgot-password" className="text-sm text-souk-600 hover:text-souk-800">
            Mot de passe oublié?
          </a>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-souk-500">
            <Lock size={18} />
          </div>
          <Input
            type="password"
            id="login-password"
            className="pl-10 w-full"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={buttonLoading}
          />
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={buttonLoading}
        className="w-full bg-souk-700 hover:bg-souk-800 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center button-hover disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {buttonLoading ? (
          <span className="flex items-center">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            Traitement...
          </span>
        ) : (
          <>
            Se connecter
            <ArrowRight size={18} className="ml-2" />
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;

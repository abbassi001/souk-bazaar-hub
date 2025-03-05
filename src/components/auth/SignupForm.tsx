
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, ArrowRight, UserCircle } from "lucide-react";

interface SignupFormProps {
  isSubmitting: boolean;
  onSignupSuccess: () => void;
}

const SignupForm = ({ isSubmitting, onSignupSuccess }: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!name.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez saisir votre nom complet",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    try {
      await signUp(email, password, name, role);
      onSignupSuccess();
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="signup-name" className="block text-sm font-medium text-souk-700">
          Nom complet
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-souk-500">
            <User size={18} />
          </div>
          <input
            type="text"
            id="signup-name"
            className="pl-10 w-full px-4 py-3 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
            placeholder="Votre nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="role" className="block text-sm font-medium text-souk-700">
          Type de compte
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`p-3 flex items-center justify-center border rounded-md cursor-pointer ${
              role === 'buyer' 
                ? 'bg-souk-100 border-souk-700 text-souk-900' 
                : 'border-souk-300 text-souk-700'
            }`}
            onClick={() => setRole('buyer')}
            disabled={isSubmitting}
          >
            <User size={18} className="mr-2" />
            Acheteur
          </button>
          <button
            type="button"
            className={`p-3 flex items-center justify-center border rounded-md cursor-pointer ${
              role === 'seller' 
                ? 'bg-souk-100 border-souk-700 text-souk-900' 
                : 'border-souk-300 text-souk-700'
            }`}
            onClick={() => setRole('seller')}
            disabled={isSubmitting}
          >
            <UserCircle size={18} className="mr-2" />
            Vendeur
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="signup-email" className="block text-sm font-medium text-souk-700">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-souk-500">
            <Mail size={18} />
          </div>
          <input
            type="email"
            id="signup-email"
            className="pl-10 w-full px-4 py-3 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="signup-password" className="block text-sm font-medium text-souk-700">
          Mot de passe
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-souk-500">
            <Lock size={18} />
          </div>
          <input
            type="password"
            id="signup-password"
            className="pl-10 w-full px-4 py-3 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
            placeholder="Choisir un mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={isSubmitting}
          />
        </div>
        <p className="text-xs text-souk-500">
          Le mot de passe doit contenir au moins 6 caractères
        </p>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-souk-700 hover:bg-souk-800 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center button-hover disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            Traitement...
          </span>
        ) : (
          <>
            Créer un compte
            <ArrowRight size={18} className="ml-2" />
          </>
        )}
      </button>
    </form>
  );
};

export default SignupForm;

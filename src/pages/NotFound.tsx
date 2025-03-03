
import { useLocation, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ArrowLeft, Home } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "@/context/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const getSuggestion = useMemo(() => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes('product')) {
      return {
        text: "Découvrir tous nos produits",
        link: "/products"
      };
    } else if (path.includes('panier') || path.includes('cart')) {
      return {
        text: "Voir votre panier",
        link: "/cart"
      };
    } else if (path.includes('compte') || path.includes('account')) {
      return {
        text: "Accéder à votre compte",
        link: "/account"
      };
    } else if (path.includes('vendre') || path.includes('sell') || path.includes('dashboard')) {
      return {
        text: "Tableau de bord vendeur",
        link: "/dashboard"
      };
    }
    
    return null;
  }, [location.pathname]);

  const homePath = useMemo(() => {
    if (user) {
      return user.role === 'seller' ? '/dashboard' : '/products';
    }
    return '/';
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full text-center">
          <h1 className="text-9xl font-bold text-souk-300">404</h1>
          <h2 className="text-2xl font-semibold text-souk-900 mb-6">Page Introuvable</h2>
          <p className="text-souk-700 mb-8">
            La page que vous recherchez n'existe pas ou a été déplacée.
            Utilisez les liens ci-dessous pour continuer votre navigation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={homePath}
              className="bg-souk-700 hover:bg-souk-800 text-white py-3 px-6 rounded-md 
                      font-medium inline-flex items-center justify-center button-hover"
            >
              <Home size={18} className="mr-2" />
              Retour à l'accueil
            </Link>
            
            <Link
              to="javascript:history.back()"
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="border border-souk-300 hover:bg-souk-50 text-souk-700 py-3 px-6 rounded-md 
                      font-medium inline-flex items-center justify-center"
            >
              <ArrowLeft size={18} className="mr-2" />
              Page précédente
            </Link>
          </div>
          
          {getSuggestion && (
            <div className="mt-8 bg-souk-50 p-4 rounded-lg">
              <p className="text-souk-700 mb-2">Vous cherchiez peut-être :</p>
              <Link 
                to={getSuggestion.link}
                className="text-souk-700 font-medium hover:text-souk-900 hover-underline"
              >
                {getSuggestion.text}
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;

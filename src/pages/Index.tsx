
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CategorySection from '../components/CategorySection';
import ArtisanSpotlight from '../components/ArtisanSpotlight';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Afficher un message de bienvenue si l'utilisateur vient de se connecter
    const isNewLogin = sessionStorage.getItem('newLogin');
    if (isNewLogin === 'true' && user) {
      setShowWelcomeMessage(true);
      toast({
        title: "Bienvenue!",
        description: `Ravi de vous revoir, ${user.name || 'cher client'}!`,
        duration: 5000
      });
      sessionStorage.removeItem('newLogin');
    }
  }, [user]);

  const handleProductClick = (productId: string) => {
    if (!user) {
      // Sauvegarder la destination pour rediriger après connexion
      sessionStorage.setItem('redirectAfterLogin', `/product/${productId}`);
      toast({
        title: "Connexion requise",
        description: "Connectez-vous pour voir les détails et acheter ce produit",
        duration: 5000
      });
      navigate('/login');
    } else {
      navigate(`/product/${productId}`);
    }
  };

  const startShopping = () => {
    navigate('/products');
  };

  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      
      {/* Bannière de bienvenue pour les nouveaux utilisateurs connectés */}
      {showWelcomeMessage && user && (
        <div className="bg-souk-100 py-4 px-6 my-8 mx-auto max-w-5xl rounded-lg shadow-sm border border-souk-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-souk-800">Bienvenue, {user.name || 'cher client'}!</h3>
              <p className="text-souk-600">Découvrez notre collection de produits artisanaux uniques.</p>
            </div>
            <Button onClick={startShopping} className="bg-souk-700 hover:bg-souk-800">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Commencer vos achats
            </Button>
          </div>
        </div>
      )}
      
      <FeaturedProducts onProductClick={handleProductClick} />
      <CategorySection />
      <ArtisanSpotlight />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Index;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, LayoutGrid, BarChart2, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SellerStats from '@/components/seller/SellerStats';
import ProductsTable from '@/components/seller/ProductsTable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    // Check if the user is a seller
    if (user && user.role !== 'seller') {
      toast({
        title: "Accès non autorisé",
        description: "Cette page est réservée aux vendeurs.",
        variant: "destructive",
      });
      navigate('/products');
    }
    
    setIsLoading(false);
  }, [user, navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-t-4 border-souk-700 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-souk-900 mb-2">Tableau de bord vendeur</h1>
            <p className="text-souk-600">
              Gérez vos produits et suivez vos performances.
            </p>
          </div>
          
          <Button 
            className="mt-4 md:mt-0" 
            onClick={() => navigate('/seller/add-product')}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
        </div>
        
        <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="products">
              <LayoutGrid className="mr-2 h-4 w-4" />
              Mes produits
            </TabsTrigger>
            <TabsTrigger value="stats">
              <BarChart2 className="mr-2 h-4 w-4" />
              Statistiques
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="mr-2 h-4 w-4" />
              Commandes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-6">
            <ProductsTable />
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
            <SellerStats />
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-6">
            <div className="p-12 text-center border border-dashed border-souk-300 rounded-lg">
              <h3 className="text-lg font-medium text-souk-800 mb-2">
                Gestion des commandes à venir
              </h3>
              <p className="text-souk-600">
                Cette fonctionnalité sera disponible prochainement.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;

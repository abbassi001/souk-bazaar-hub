
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from '../components/ui/use-toast';
import { categoryNames } from '@/types/product';
import { mockProductsByCategory } from '@/data/mockProducts';
import CategoryBreadcrumb from '@/components/category/CategoryBreadcrumb';
import CategoryHeader from '@/components/category/CategoryHeader';
import ProductGrid from '@/components/category/ProductGrid';
import EmptyCategory from '@/components/category/EmptyCategory';

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState<string>('');
  
  useEffect(() => {
    if (!id) return;
    
    // Simuler un chargement
    setLoading(true);
    
    // Temporisation pour simuler un chargement de données
    const timer = setTimeout(() => {
      const categoryProducts = mockProductsByCategory[id] || [];
      setProducts(categoryProducts);
      setCategoryName(categoryNames[id] || id);
      
      // Si aucun produit n'est trouvé et que la catégorie n'existe pas
      if (categoryProducts.length === 0 && !mockProductsByCategory[id]) {
        toast({
          title: "Catégorie introuvable",
          description: "Cette catégorie n'existe pas ou ne contient aucun produit.",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <CategoryBreadcrumb categoryName={categoryName} />
        
        <CategoryHeader 
          categoryName={categoryName} 
          productCount={products.length} 
          isLoading={loading} 
        />
        
        {loading || products.length > 0 ? (
          <ProductGrid products={products} isLoading={loading} />
        ) : (
          <EmptyCategory />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;

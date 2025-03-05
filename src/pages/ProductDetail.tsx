
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import ProductImages from '../components/product/ProductImages';
import ProductInfo from '../components/product/ProductInfo';
import ProductDetails from '../components/product/ProductDetails';
import RelatedProducts from '../components/product/RelatedProducts';
import { Product } from '@/types/product';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch product data from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Fetch the product from Supabase
        const { data: productData, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (error) {
          throw error;
        }
        
        if (!productData) {
          toast({
            title: "Produit non trouvé",
            description: "Le produit que vous recherchez n'existe pas ou a été supprimé.",
            variant: "destructive",
          });
          return;
        }
        
        // Add dummy artisan data for now - this should eventually come from a real table
        const productWithArtisan = {
          ...productData,
          images: productData.image ? [productData.image] : [],
          reviewCount: productData.reviews || 0,
          features: [
            'Matériaux: 100% laine naturelle',
            'Dimensions: 200 x 150 cm',
            'Tissage manuel traditionnel',
            'Motifs berbères authentiques',
            'Chaque pièce est unique'
          ],
          stock: 12,
          artisan: {
            name: 'Fatima Zahra',
            location: 'Marrakech, Maroc',
            since: 2005,
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop'
          }
        };
        
        setProduct(productWithArtisan);
        
        // Fetch related products (same category)
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .neq('id', id)
          .limit(4);
        
        if (relatedError) {
          console.error('Error fetching related products:', relatedError);
        } else {
          setRelatedProducts(relatedData as Product[]);
        }
        
      } catch (error: any) {
        console.error('Error fetching product:', error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors du chargement du produit.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, toast]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-souk-700 border-solid rounded-full animate-spin"></div>
        </main>
        <Footer />
      </div>
    );
  }

  // 404 state
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-souk-900 mb-4">Produit non trouvé</h1>
          <p className="text-souk-600 mb-6">Le produit que vous recherchez n'existe pas ou a été supprimé.</p>
          <Link to="/products" className="bg-souk-700 hover:bg-souk-800 text-white px-6 py-2 rounded-md">
            Retour aux produits
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Create productInfo with the correct structure for ProductInfo component
  const productInfo = {
    id: product.id,
    name: product.name,
    price: product.price,
    discountPrice: product.old_price || product.price,
    description: product.description,
    category: product.category,
    rating: product.rating,
    reviewCount: product.reviewCount,
    stock: product.stock,
    artisan: product.artisan
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb 
          items={[
            { label: 'Accueil', path: '/' },
            { label: 'Produits', path: '/products' },
            { label: product.name }
          ]}
        />
        
        {/* Back button */}
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-souk-700 hover:text-souk-900">
            <ArrowLeft size={18} className="mr-2" />
            Retour aux produits
          </Link>
        </div>
        
        {/* Product main section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product images */}
          <ProductImages images={product.images} name={product.name} />
          
          {/* Product details */}
          <ProductInfo product={productInfo} />
        </div>
        
        {/* Collapsible sections */}
        <div className="mb-16">
          <ProductDetails description={product.description} features={product.features} />
        </div>
        
        {/* Related products */}
        <RelatedProducts products={relatedProducts} />
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;

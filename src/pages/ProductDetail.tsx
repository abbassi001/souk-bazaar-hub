
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

// Dummy product data - to be replaced with API calls
const productData = {
  id: '1',
  name: 'Tapis Berbère Traditionnel',
  price: 1299,
  old_price: 999,
  description: 'Tapis berbère artisanal tissé à la main par des artisans marocains. Ces tapis sont fabriqués selon des techniques traditionnelles transmises de génération en génération. Chaque motif raconte une histoire unique et symbolique de la culture berbère.',
  features: [
    'Matériaux: 100% laine naturelle',
    'Dimensions: 200 x 150 cm',
    'Tissage manuel traditionnel',
    'Motifs berbères authentiques',
    'Chaque pièce est unique'
  ],
  rating: 4.7,
  reviewCount: 128,
  images: [
    'https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=2787&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505409628601-edc9af17fda6?q=80&w=2000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574223706388-0e0f6f0390f1?q=80&w=1964&auto=format&fit=crop'
  ],
  category: 'Artisanat',
  stock: 12,
  artisan: {
    name: 'Fatima Zahra',
    location: 'Marrakech, Maroc',
    since: 2005,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop'
  }
};

// Dummy related products converted to match Product interface
const relatedProducts: Product[] = [
  {
    id: '2',
    name: 'Coussin Kilim',
    price: 299,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop',
    category: 'textiles',
    seller_id: '1'
  },
  {
    id: '3',
    name: 'Panier Tressé',
    price: 199,
    image: 'https://images.unsplash.com/photo-1609510368600-883b7f16d121?q=80&w=1965&auto=format&fit=crop',
    category: 'home-decor',
    seller_id: '1'
  },
  {
    id: '4',
    name: 'Lanterne Marocaine',
    price: 349,
    image: 'https://images.unsplash.com/photo-1517821099606-cef63a9e210e?q=80&w=1974&auto=format&fit=crop',
    category: 'lighting',
    seller_id: '1'
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(productData);

  // Simulate fetching product by ID - to be replaced with real API call
  useEffect(() => {
    console.log(`Fetching product with ID: ${id}`);
    // For now, just use the dummy data
    setProduct(productData);
  }, [id]);

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
          <ProductInfo product={product} />
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

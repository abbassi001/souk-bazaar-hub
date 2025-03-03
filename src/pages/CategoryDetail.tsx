
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { toast } from '../components/ui/use-toast';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Home, ChevronRight } from 'lucide-react';

// Type pour nos produits
interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
  category: string;
  seller: {
    name: string;
    location: string;
    isVerified: boolean;
  };
}

// Données mockées pour les produits par catégorie
const mockProductsByCategory: Record<string, Product[]> = {
  'home-decor': [
    {
      id: '101',
      name: 'Vase artisanal marocain',
      price: 89.99,
      oldPrice: 120.00,
      image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800',
      rating: 4.7,
      reviews: 124,
      isNew: true,
      category: 'home-decor',
      seller: {
        name: 'Artisanat Marrakech',
        location: 'Marrakech, Maroc',
        isVerified: true,
      }
    },
    {
      id: '102',
      name: 'Miroir mosaïque',
      price: 154.99,
      image: 'https://images.unsplash.com/photo-1619072262407-38d7d127e047?w=800',
      rating: 4.9,
      reviews: 86,
      category: 'home-decor',
      seller: {
        name: 'Mosaïque Fès',
        location: 'Fès, Maroc',
        isVerified: true,
      }
    },
    {
      id: '103',
      name: 'Lanterne marocaine',
      price: 75.50,
      oldPrice: 95.00,
      image: 'https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=800',
      rating: 4.6,
      reviews: 57,
      category: 'home-decor',
      seller: {
        name: 'Lumières du Souk',
        location: 'Rabat, Maroc',
        isVerified: true,
      }
    }
  ],
  'textiles': [
    {
      id: '201',
      name: 'Tapis Berbère',
      price: 249.99,
      oldPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1573806798626-7fd5114f0afc?w=800',
      rating: 4.8,
      reviews: 93,
      category: 'textiles',
      seller: {
        name: 'Héritage Berbère',
        location: 'Atlas, Maroc',
        isVerified: true,
      }
    },
    {
      id: '202',
      name: 'Coussin brodé à la main',
      price: 48.50,
      image: 'https://images.unsplash.com/photo-1584346133934-7a7b82120e3c?w=800',
      rating: 4.5,
      reviews: 41,
      isNew: true,
      category: 'textiles',
      seller: {
        name: 'Broderies du Sud',
        location: 'Essaouira, Maroc',
        isVerified: false,
      }
    },
    {
      id: '203',
      name: 'Tenture murale',
      price: 124.99,
      oldPrice: 150.00,
      image: 'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800',
      rating: 4.6,
      reviews: 72,
      category: 'textiles',
      seller: {
        name: 'Tissages de Chefchaouen',
        location: 'Chefchaouen, Maroc',
        isVerified: true,
      }
    }
  ],
  'jewelry': [
    {
      id: '301',
      name: 'Bracelet argent berbère',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1611591437281-460bcd07d8e5?w=800',
      rating: 4.9,
      reviews: 108,
      category: 'jewelry',
      seller: {
        name: 'Argent Touareg',
        location: 'Tiznit, Maroc',
        isVerified: true,
      }
    },
    {
      id: '302',
      name: 'Collier berbère traditionnel',
      price: 124.50,
      oldPrice: 160.00,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      rating: 4.7,
      reviews: 65,
      isNew: true,
      category: 'jewelry',
      seller: {
        name: 'Bijoux d\'Antan',
        location: 'Agadir, Maroc',
        isVerified: true,
      }
    }
  ],
  'ceramics': [
    {
      id: '401',
      name: 'Tajine décoratif',
      price: 64.99,
      image: 'https://images.unsplash.com/photo-1577042939454-8b29529ae351?w=800',
      rating: 4.6,
      reviews: 49,
      category: 'ceramics',
      seller: {
        name: 'Poteries de Safi',
        location: 'Safi, Maroc',
        isVerified: true,
      }
    },
    {
      id: '402',
      name: 'Service à thé marocain',
      price: 129.99,
      oldPrice: 159.99,
      image: 'https://images.unsplash.com/photo-1582070915699-5114fb5e73f8?w=800',
      rating: 4.8,
      reviews: 73,
      category: 'ceramics',
      seller: {
        name: 'Art de la Table',
        location: 'Tétouan, Maroc',
        isVerified: false,
      }
    }
  ],
  'spices': [
    {
      id: '501',
      name: 'Assortiment d\'épices marocaines',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800',
      rating: 4.9,
      reviews: 127,
      isNew: true,
      category: 'spices',
      seller: {
        name: 'Épices du Souk',
        location: 'Marrakech, Maroc',
        isVerified: true,
      }
    },
    {
      id: '502',
      name: 'Ras el hanout premium',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1635361803665-e434bbb49f7c?w=800',
      rating: 4.7,
      reviews: 85,
      category: 'spices',
      seller: {
        name: 'Herboriste Traditionnel',
        location: 'Fès, Maroc',
        isVerified: true,
      }
    }
  ],
  'leather': [
    {
      id: '601',
      name: 'Sac à main en cuir',
      price: 89.99,
      oldPrice: 120.00,
      image: 'https://images.unsplash.com/photo-1598532213919-820c6b5885cd?w=800',
      rating: 4.5,
      reviews: 52,
      category: 'leather',
      seller: {
        name: 'Cuir de Fès',
        location: 'Fès, Maroc',
        isVerified: true,
      }
    },
    {
      id: '602',
      name: 'Babouches en cuir',
      price: 54.99,
      image: 'https://images.unsplash.com/photo-1551101908-c54985652490?w=800',
      rating: 4.6,
      reviews: 69,
      isNew: true,
      category: 'leather',
      seller: {
        name: 'Artisans du Cuir',
        location: 'Marrakech, Maroc',
        isVerified: false,
      }
    }
  ],
  'furniture': [
    {
      id: '701',
      name: 'Table basse en bois sculpté',
      price: 349.99,
      oldPrice: 450.00,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      rating: 4.8,
      reviews: 38,
      category: 'furniture',
      seller: {
        name: 'Bois & Traditions',
        location: 'Essaouira, Maroc',
        isVerified: true,
      }
    }
  ],
  'lighting': [
    {
      id: '801',
      name: 'Suspension marocaine cuivre',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1517821099606-cef63a9e210e?w=800',
      rating: 4.7,
      reviews: 45,
      isNew: true,
      category: 'lighting',
      seller: {
        name: 'Luminaires d\'Orient',
        location: 'Marrakech, Maroc',
        isVerified: true,
      }
    }
  ]
};

// Map des noms de catégories
const categoryNames: Record<string, string> = {
  'home-decor': 'Décoration Maison',
  'textiles': 'Textiles',
  'jewelry': 'Bijoux',
  'ceramics': 'Céramiques',
  'spices': 'Épices',
  'leather': 'Articles en Cuir',
  'furniture': 'Mobilier',
  'lighting': 'Éclairage'
};

const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
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
        {/* Fil d'Ariane */}
        <Breadcrumb className="mb-8">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Catégories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>{categoryName}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-souk-900 mb-4">
            {categoryName}
          </h1>
          
          {!loading && products.length > 0 && (
            <p className="max-w-2xl mx-auto text-souk-700">
              Découvrez notre collection de {products.length} produits artisanaux dans la catégorie {categoryName.toLowerCase()}.
            </p>
          )}
        </div>
        
        {loading ? (
          // États de chargement
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-96 rounded-lg bg-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          // Afficher les produits
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Aucun produit trouvé
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Aucun produit trouvé
            </h2>
            <p className="text-gray-600 mb-8">
              Nous n'avons pas encore de produits dans cette catégorie.
            </p>
            <Link 
              to="/categories" 
              className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-souk-600 text-white hover:bg-souk-700 transition-colors"
            >
              Voir toutes les catégories
            </Link>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;

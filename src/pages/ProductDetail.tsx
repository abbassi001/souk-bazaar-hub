
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Heart, ArrowLeft, Share2, Star, Truck, Shield, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

// Dummy product data - to be replaced with API calls
const productData = {
  id: '1',
  name: 'Tapis Berbère Traditionnel',
  price: 1299,
  discountPrice: 999,
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

// Dummy related products - to be replaced with API calls
const relatedProducts = [
  {
    id: '2',
    name: 'Coussin Kilim',
    price: 299,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop',
    category: 'Textile'
  },
  {
    id: '3',
    name: 'Panier Tressé',
    price: 199,
    image: 'https://images.unsplash.com/photo-1609510368600-883b7f16d121?q=80&w=1965&auto=format&fit=crop',
    category: 'Vannerie'
  },
  {
    id: '4',
    name: 'Lanterne Marocaine',
    price: 349,
    image: 'https://images.unsplash.com/photo-1517821099606-cef63a9e210e?q=80&w=1974&auto=format&fit=crop',
    category: 'Luminaire'
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(productData);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(productData.images[0]);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const { toast } = useToast();

  // Simulate fetching product by ID - to be replaced with real API call
  useEffect(() => {
    console.log(`Fetching product with ID: ${id}`);
    // For now, just use the dummy data
    setProduct(productData);
    setMainImage(productData.images[0]);
  }, [id]);

  const handleAddToCart = () => {
    // Add to cart logic here
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} ajouté au panier`,
      duration: 3000
    });
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="text-souk-500 hover:text-souk-700">Accueil</Link>
          <span className="mx-2 text-souk-500">/</span>
          <Link to="/products" className="text-souk-500 hover:text-souk-700">Produits</Link>
          <span className="mx-2 text-souk-500">/</span>
          <span className="text-souk-900">{product.name}</span>
        </nav>
        
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
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-souk-100">
              <img 
                src={mainImage} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer ${
                    mainImage === image ? 'ring-2 ring-souk-700' : 'border border-souk-200'
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product details */}
          <div className="space-y-6">
            <div>
              <h5 className="text-souk-500 text-sm font-medium mb-2">{product.category}</h5>
              <h1 className="text-3xl font-bold text-souk-900 mb-3">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="ml-2 text-souk-700">{product.rating}</span>
                <span className="mx-2 text-souk-400">|</span>
                <span className="text-souk-600">{product.reviewCount} avis</span>
              </div>
              
              {/* Price */}
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-souk-900">{product.discountPrice} MAD</span>
                {product.discountPrice < product.price && (
                  <span className="ml-3 text-lg text-souk-500 line-through">{product.price} MAD</span>
                )}
                {product.discountPrice < product.price && (
                  <span className="ml-3 px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                    {Math.round((1 - product.discountPrice / product.price) * 100)}% off
                  </span>
                )}
              </div>
              
              {/* Stock */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <p className="text-green-600 flex items-center">
                    <span className="w-2 h-2 bg-green-600 rounded-full inline-block mr-2"></span>
                    En stock ({product.stock} disponible)
                  </p>
                ) : (
                  <p className="text-red-600 flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full inline-block mr-2"></span>
                    Rupture de stock
                  </p>
                )}
              </div>
              
              {/* Short description */}
              <p className="text-souk-600 mb-6">
                {product.description.substring(0, 150)}...
              </p>
              
              {/* Quantity selector */}
              <div className="flex items-center mb-6">
                <span className="mr-4 text-souk-700 font-medium">Quantité:</span>
                <div className="flex items-center border border-souk-300 rounded-md">
                  <button 
                    className="px-3 py-2 text-souk-500 hover:text-souk-900"
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-souk-900 w-10 text-center">{quantity}</span>
                  <button 
                    className="px-3 py-2 text-souk-500 hover:text-souk-900"
                    onClick={() => handleQuantityChange('increment')}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
                <button 
                  className="flex-1 bg-souk-700 hover:bg-souk-800 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center button-hover"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Ajouter au panier
                </button>
                <button className="flex-none bg-souk-100 hover:bg-souk-200 text-souk-700 p-3 rounded-md">
                  <Heart size={20} />
                </button>
                <button className="flex-none bg-souk-100 hover:bg-souk-200 text-souk-700 p-3 rounded-md">
                  <Share2 size={20} />
                </button>
              </div>
              
              {/* Artisan */}
              <div className="mt-8 p-4 border border-souk-200 rounded-lg">
                <div className="flex items-center">
                  <img 
                    src={product.artisan.image} 
                    alt={product.artisan.name}
                    className="w-14 h-14 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="text-sm text-souk-500">Artisan</p>
                    <h4 className="font-medium text-souk-900">{product.artisan.name}</h4>
                    <p className="text-sm text-souk-600">{product.artisan.location}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-souk-600">
                  Artisan depuis {new Date().getFullYear() - product.artisan.since} ans
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Collapsible sections */}
        <div className="space-y-4 mb-16">
          {/* Description */}
          <div className="border border-souk-200 rounded-lg overflow-hidden">
            <button 
              className="w-full flex justify-between items-center p-4 text-left font-medium text-souk-900"
              onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              Description et caractéristiques
              {isDescriptionOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isDescriptionOpen && (
              <div className="p-4 pt-0 border-t border-souk-200">
                <p className="text-souk-700 mb-4">
                  {product.description}
                </p>
                <h4 className="font-medium text-souk-900 mb-2">Caractéristiques:</h4>
                <ul className="list-disc list-inside space-y-1 text-souk-700">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Shipping & Returns */}
          <div className="border border-souk-200 rounded-lg overflow-hidden">
            <button 
              className="w-full flex justify-between items-center p-4 text-left font-medium text-souk-900"
              onClick={() => setIsShippingOpen(!isShippingOpen)}
            >
              Livraison et retours
              {isShippingOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {isShippingOpen && (
              <div className="p-4 pt-0 border-t border-souk-200 space-y-4">
                <div className="flex items-start">
                  <Truck size={20} className="mr-3 text-souk-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-souk-900 mb-1">Livraison</h4>
                    <p className="text-souk-700 text-sm">
                      Livraison standard en 3-5 jours ouvrables. Livraison express disponible.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield size={20} className="mr-3 text-souk-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-souk-900 mb-1">Garantie</h4>
                    <p className="text-souk-700 text-sm">
                      Tous nos produits artisanaux sont garantis authentiques et de haute qualité.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock size={20} className="mr-3 text-souk-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-souk-900 mb-1">Retours</h4>
                    <p className="text-souk-700 text-sm">
                      Retours acceptés dans les 14 jours suivant la réception si le produit est en parfait état.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related products */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-souk-900 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;

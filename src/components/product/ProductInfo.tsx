
import { useState } from 'react';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Artisan {
  name: string;
  location: string;
  since: number;
  image: string;
}

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    price: number;
    discountPrice: number;
    description: string;
    category: string;
    rating: number;
    reviewCount: number;
    stock: number;
    artisan: Artisan;
  };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} ajouté au panier`,
      duration: 3000
    });
  };

  return (
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
  );
};

export default ProductInfo;

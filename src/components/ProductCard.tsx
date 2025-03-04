
import { useState, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  category, 
  isNew = false 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { user } = useAuth();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const isLiked = isInWishlist(id);

  const handleAction = useCallback((action: 'cart' | 'wishlist') => {
    if (!user) {
      localStorage.setItem('returnTo', `/product/${id}`);
      navigate('/login');
      return;
    }

    if (action === 'cart') {
      addItem({ id, name, price, image, category });
    } else {
      if (isLiked) {
        removeFromWishlist(id);
      } else {
        addToWishlist({ id, name, price, image, category });
      }
    }
  }, [user, id, name, price, image, category, addItem, addToWishlist, removeFromWishlist, isLiked, navigate]);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const handleAddToCart = useCallback(() => handleAction('cart'), [handleAction]);
  const handleToggleWishlist = useCallback(() => handleAction('wishlist'), [handleAction]);

  return (
    <div 
      className="group card-hover rounded-lg bg-white overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative image-zoom aspect-square overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0 bg-souk-100 animate-pulse transition-opacity duration-500",
            imageLoaded ? "opacity-0" : "opacity-100"
          )}
        />
        
        <img 
          src={image} 
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        
        {isNew && (
          <span className="absolute top-3 left-3 bg-souk-500 text-white text-xs font-bold 
                          px-3 py-1 rounded-full">
            New
          </span>
        )}
        
        <button 
          onClick={handleToggleWishlist}
          className={cn(
            "absolute top-3 right-3 bg-white/90 p-2 rounded-full transition-all duration-300",
            isLiked ? "text-red-500" : "text-souk-700",
            "hover:bg-souk-700 hover:text-white",
            isHovered ? "opacity-100 transform scale-100" : "opacity-0 transform scale-90"
          )}
          aria-label={isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={18} className={cn(
            "transition-all duration-300",
            isLiked ? "fill-current" : ""
          )} />
        </button>
        
        <button 
          onClick={handleAddToCart}
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm",
            "p-3 flex justify-center transform transition-transform duration-300",
            isHovered ? "translate-y-0" : "translate-y-full"
          )}
        >
          <span className="bg-souk-700 hover:bg-souk-800 text-white py-2 px-4 
                         rounded-md text-sm font-medium flex items-center button-hover">
            <ShoppingCart size={16} className="mr-2" />
            Ajouter au panier
          </span>
        </button>
      </div>
      
      <ProductCardInfo 
        id={id}
        name={name}
        price={price}
        category={category}
      />
    </div>
  );
};

const ProductCardInfo = memo(({ 
  id, 
  name, 
  price, 
  category 
}: Omit<ProductCardProps, 'image' | 'isNew'>) => (
  <div className="p-4">
    <p className="text-xs text-souk-500 font-medium mb-1">{category}</p>
    
    <Link to={`/product/${id}`}>
      <h3 className="font-medium text-souk-900 mb-2 transition-colors hover:text-souk-600">
        {name}
      </h3>
    </Link>
    
    <p className="font-semibold text-souk-700">${price.toFixed(2)}</p>
  </div>
));

ProductCardInfo.displayName = 'ProductCardInfo';

export default memo(ProductCard);

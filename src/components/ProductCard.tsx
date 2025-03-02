
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({ id, name, price, image, category, isNew = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group card-hover rounded-lg bg-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative image-zoom aspect-square overflow-hidden">
        {/* Blur placeholder */}
        <div 
          className={`absolute inset-0 bg-souk-100 animate-pulse transition-opacity duration-500 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        ></div>
        
        <img 
          src={image} 
          alt={name}
          className={`w-full h-full object-cover transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {isNew && (
          <span className="absolute top-3 left-3 bg-souk-500 text-white text-xs font-bold 
                          px-3 py-1 rounded-full">
            New
          </span>
        )}
        
        <button 
          className={`absolute top-3 right-3 bg-white/90 p-2 rounded-full text-souk-700
                    hover:bg-souk-700 hover:text-white transition-all duration-300
                    ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <Heart size={18} />
        </button>
        
        <div 
          className={`absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm
                    p-3 flex justify-center transform transition-transform duration-300
                    ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}
        >
          <button className="bg-souk-700 hover:bg-souk-800 text-white py-2 px-4 
                           rounded-md text-sm font-medium flex items-center button-hover">
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-xs text-souk-500 font-medium mb-1">{category}</p>
        
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-souk-900 mb-2 transition-colors hover:text-souk-600">
            {name}
          </h3>
        </Link>
        
        <p className="font-semibold text-souk-700">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;

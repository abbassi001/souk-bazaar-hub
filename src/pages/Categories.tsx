
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock data for categories
const mockCategories = [
  {
    id: 'home-decor',
    name: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800',
    count: 124,
    description: 'Beautiful handcrafted items to bring a touch of artisanal charm to your home.'
  },
  {
    id: 'textiles',
    name: 'Textiles',
    image: 'https://images.unsplash.com/photo-1573806798626-7fd5114f0afc?w=800',
    count: 86,
    description: 'Traditional handwoven fabrics, rugs, and textiles created using ancient techniques.'
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    count: 53,
    description: 'Uniquely crafted jewelry pieces showcasing cultural heritage and skilled craftsmanship.'
  },
  {
    id: 'ceramics',
    name: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1582070915699-5114fb5e73f8?w=800',
    count: 78,
    description: 'Hand-formed and decorated pottery with distinctive patterns and glazes.'
  },
  {
    id: 'spices',
    name: 'Spices',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800',
    count: 42,
    description: 'Premium quality spices sourced directly from local farmers across the region.'
  },
  {
    id: 'leather',
    name: 'Leather Goods',
    image: 'https://images.unsplash.com/photo-1598532213919-820c6b5885cd?w=800',
    count: 65,
    description: 'Traditionally tanned and handcrafted leather products made by skilled artisans.'
  },
  {
    id: 'furniture',
    name: 'Furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    count: 39,
    description: 'Beautifully crafted wooden furniture pieces that blend tradition with modern design.'
  },
  {
    id: 'lighting',
    name: 'Lighting',
    image: 'https://images.unsplash.com/photo-1517821099606-cef63a9e210e?w=800',
    count: 47,
    description: 'Unique handcrafted lamps and lanterns that cast enchanting patterns of light and shadow.'
  }
];

const CategoriesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleImageLoad = (id: string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-souk-900 mb-4">
            Browse Our Categories
          </h1>
          
          <p className="max-w-2xl mx-auto text-souk-700">
            Explore our diverse collection of artisanal goods, organized by category.
            Each category represents a unique craft tradition with its own rich history.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className={`group relative h-80 rounded-lg overflow-hidden card-hover
                        transition-all duration-700 opacity-0 translate-y-8
                        ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {/* Blur placeholder */}
              <div 
                className={`absolute inset-0 bg-souk-100 animate-pulse transition-opacity duration-500 ${
                  imagesLoaded[category.id] ? 'opacity-0' : 'opacity-100'
                }`}
              ></div>
              
              <img 
                src={category.image} 
                alt={category.name}
                className={`w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110 ${
                  imagesLoaded[category.id] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(category.id)}
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-souk-900/70 group-hover:to-souk-900/80 transition-all duration-300"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2 group-hover:translate-y-0 translate-y-0 transition-all duration-300">
                  {category.name}
                </h3>
                
                <p className="text-white/70 text-sm mb-3 transform translate-y-0 opacity-100 transition-all duration-300">
                  {category.count} products
                </p>
                
                <p className="text-white/90 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;

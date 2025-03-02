
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

const mockCategories: Category[] = [
  {
    id: 'home-decor',
    name: 'Home Decor',
    image: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800',
    count: 124
  },
  {
    id: 'textiles',
    name: 'Textiles',
    image: 'https://images.unsplash.com/photo-1573806798626-7fd5114f0afc?w=800',
    count: 86
  },
  {
    id: 'jewelry',
    name: 'Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    count: 53
  },
  {
    id: 'ceramics',
    name: 'Ceramics',
    image: 'https://images.unsplash.com/photo-1582070915699-5114fb5e73f8?w=800',
    count: 78
  },
  {
    id: 'spices',
    name: 'Spices',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=800',
    count: 42
  },
  {
    id: 'leather',
    name: 'Leather Goods',
    image: 'https://images.unsplash.com/photo-1598532213919-820c6b5885cd?w=800',
    count: 65
  }
];

const CategorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('category-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleImageLoad = (id: string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <section 
      id="category-section" 
      className="py-20 px-4"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span 
            className={`inline-block px-4 py-2 bg-souk-100 text-souk-800 rounded-full text-sm font-medium mb-4
                      transition-all duration-500 opacity-0 ${isVisible ? 'opacity-100' : ''}`}
          >
            Explore by Category
          </span>
          
          <h2 
            className={`text-3xl md:text-4xl font-bold text-souk-900 mb-4
                      transition-all duration-500 delay-100 opacity-0 translate-y-4
                      ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
          >
            Browse Our Collection
          </h2>
          
          <p 
            className={`max-w-2xl mx-auto text-souk-700
                      transition-all duration-500 delay-200 opacity-0 translate-y-4
                      ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
          >
            Discover unique treasures across our carefully curated categories.
            From handcrafted textiles to artisanal ceramics, there's something for every taste.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((category, index) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className={`group relative h-64 rounded-lg overflow-hidden card-hover
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
                <h3 className="text-xl font-semibold mb-1 group-hover:translate-y-0 translate-y-0 transition-all duration-300">
                  {category.name}
                </h3>
                
                <p className="text-white/70 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {category.count} products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

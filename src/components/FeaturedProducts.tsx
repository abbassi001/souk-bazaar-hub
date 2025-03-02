
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

// Mock data for featured products
const mockProducts = [
  {
    id: '1',
    name: 'Handmade Ceramic Vase',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1612323795550-e50ea0b9acab?w=800',
    category: 'Home Decor',
    isNew: true
  },
  {
    id: '2',
    name: 'Woven Bamboo Basket',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1603406448185-79cde1359c59?w=800',
    category: 'Storage'
  },
  {
    id: '3',
    name: 'Handwoven Wool Rug',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1598300042761-bc13ee747fe8?w=800',
    category: 'Textiles',
    isNew: true
  },
  {
    id: '4',
    name: 'Artisanal Olive Oil',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
    category: 'Gourmet'
  }
];

const FeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById('featured-products');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section 
      id="featured-products" 
      className="py-20 px-4 bg-souk-50"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span 
            className={`inline-block px-4 py-2 bg-souk-100 text-souk-800 rounded-full text-sm font-medium mb-4
                      transition-all duration-500 opacity-0 ${isVisible ? 'opacity-100' : ''}`}
          >
            Curated Selection
          </span>
          
          <h2 
            className={`text-3xl md:text-4xl font-bold text-souk-900 mb-4
                      transition-all duration-500 delay-100 opacity-0 translate-y-4
                      ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
          >
            Featured Products
          </h2>
          
          <p 
            className={`max-w-2xl mx-auto text-souk-700
                      transition-all duration-500 delay-200 opacity-0 translate-y-4
                      ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
          >
            Discover our handpicked selection of unique artisanal products, 
            each telling a story of craftsmanship and heritage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {mockProducts.map((product, index) => (
            <div 
              key={product.id}
              className={`transition-all duration-700 opacity-0 translate-y-8
                        ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        
        <div 
          className={`mt-12 text-center
                    transition-all duration-500 delay-700 opacity-0 translate-y-4
                    ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
        >
          <Link 
            to="/products" 
            className="inline-block border-b-2 border-souk-700 text-souk-700 font-medium
                      pb-1 hover:border-souk-900 hover:text-souk-900 transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

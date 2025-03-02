
import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-souk-50">
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590579491624-f98f36d4c763?q=80&w=2070')] 
                   bg-cover bg-center opacity-20"
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-souk-900/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 h-full pt-24 flex items-center relative z-10">
        <div className="max-w-2xl">
          <span 
            className={`inline-block px-4 py-2 bg-souk-100 text-souk-800 rounded-full text-sm font-medium mb-6
                       transition-all duration-700 opacity-0 ${isLoaded ? 'opacity-100' : ''}`}
          >
            The Authentic Marketplace Experience
          </span>
          
          <h1 
            className={`text-4xl md:text-6xl font-bold text-souk-900 mb-6
                       transition-all duration-700 delay-100 opacity-0 translate-y-8 
                       ${isLoaded ? 'opacity-100 translate-y-0' : ''}`}
          >
            Discover the Essence of <span className="text-souk-600">Traditional Markets</span>
          </h1>
          
          <p 
            className={`text-lg md:text-xl text-souk-800 mb-10 max-w-xl
                      transition-all duration-700 delay-200 opacity-0 translate-y-8
                      ${isLoaded ? 'opacity-100 translate-y-0' : ''}`}
          >
            Explore unique artisanal products from around the world. 
            Directly support craftsmen and discover the stories behind each product.
          </p>
          
          <div 
            className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4
                      transition-all duration-700 delay-300 opacity-0 translate-y-8
                      ${isLoaded ? 'opacity-100 translate-y-0' : ''}`}
          >
            <Link 
              to="/products" 
              className="bg-souk-700 hover:bg-souk-800 text-white py-3 px-8 rounded-md 
                        font-medium flex items-center justify-center button-hover"
            >
              Browse Products
              <ChevronRight size={18} className="ml-2" />
            </Link>
            
            <Link 
              to="/about" 
              className="bg-transparent border border-souk-700 text-souk-700 
                        hover:bg-souk-50 py-3 px-8 rounded-md font-medium 
                        flex items-center justify-center button-hover"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      <div 
        className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent
                   transition-all duration-1000 delay-500 opacity-0
                   ${isLoaded ? 'opacity-100' : ''}`}
      ></div>
    </section>
  );
};

export default Hero;

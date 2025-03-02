
import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface Artisan {
  id: string;
  name: string;
  location: string;
  specialty: string;
  image: string;
  quote: string;
  years: number;
}

const mockArtisan: Artisan = {
  id: 'ahmad-hassan',
  name: 'Ahmad Hassan',
  location: 'Marrakech, Morocco',
  specialty: 'Traditional Ceramics',
  image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
  quote: "Each piece I create carries with it centuries of tradition. My hands merely continue the story that my ancestors began.",
  years: 32
};

const ArtisanSpotlight = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

    const element = document.getElementById('artisan-spotlight');
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
      id="artisan-spotlight" 
      className="py-20 px-4 bg-souk-50"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className={`relative
                      transition-all duration-700 opacity-0 translate-x-8
                      ${isVisible ? 'opacity-100 translate-x-0' : ''}`}
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-souk-400"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-souk-400"></div>
            
            <div className="relative rounded-lg overflow-hidden">
              {/* Blur placeholder */}
              <div 
                className={`absolute inset-0 bg-souk-100 animate-pulse transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-0' : 'opacity-100'
                }`}
              ></div>
              
              <img 
                src={mockArtisan.image} 
                alt={mockArtisan.name}
                className={`w-full h-full object-cover aspect-[3/4] transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
          
          <div 
            className={`transition-all duration-700 delay-300 opacity-0 translate-y-8
                      ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
          >
            <span className="inline-block px-4 py-2 bg-souk-100 text-souk-800 rounded-full text-sm font-medium mb-6">
              Artisan Spotlight
            </span>
            
            <h2 className="text-3xl md:text-4xl font-bold text-souk-900 mb-6">
              Meet {mockArtisan.name}
            </h2>
            
            <div className="flex items-center mb-6">
              <div className="flex space-x-1 mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="text-souk-500 fill-souk-500" />
                ))}
              </div>
              <p className="text-souk-700">Master Craftsman</p>
            </div>
            
            <div className="mb-6 flex items-start">
              <Quote size={40} className="text-souk-300 mr-4 -mt-2" />
              <p className="text-lg text-souk-700 italic">
                {mockArtisan.quote}
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex">
                <span className="font-semibold text-souk-900 w-32">Location:</span>
                <span className="text-souk-700">{mockArtisan.location}</span>
              </div>
              
              <div className="flex">
                <span className="font-semibold text-souk-900 w-32">Specialty:</span>
                <span className="text-souk-700">{mockArtisan.specialty}</span>
              </div>
              
              <div className="flex">
                <span className="font-semibold text-souk-900 w-32">Experience:</span>
                <span className="text-souk-700">{mockArtisan.years} years</span>
              </div>
            </div>
            
            <button className="bg-souk-700 hover:bg-souk-800 text-white py-3 px-8 rounded-md font-medium button-hover">
              View Collection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtisanSpotlight;

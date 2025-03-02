
import { useState, useEffect } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
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

    const element = document.getElementById('newsletter-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here would be the actual newsletter signup logic
      console.log('Subscribing email:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section 
      id="newsletter-section" 
      className="py-20 px-4 bg-souk-100"
    >
      <div className="container mx-auto max-w-4xl">
        <div 
          className={`bg-white rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden
                    transition-all duration-700 opacity-0 translate-y-8
                    ${isVisible ? 'opacity-100 translate-y-0' : ''}`}
        >
          <div className="absolute top-0 right-0 w-1/3 h-full bg-souk-50 rounded-l-full opacity-70 transform translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-souk-900 mb-4">
                Join Our Community
              </h2>
              
              <p className="text-souk-700 max-w-2xl mx-auto">
                Subscribe to our newsletter and be the first to know about new artisanal products, 
                special offers, and the stories behind our craftsmen.
              </p>
            </div>
            
            <form 
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-4 py-3 rounded-md border border-souk-200 focus:outline-none focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                  required
                />
                
                <button 
                  type="submit"
                  className="bg-souk-700 hover:bg-souk-800 text-white px-6 py-3 rounded-md font-medium button-hover"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>
              
              {isSubmitted && (
                <p className="text-green-600 text-sm mt-3 text-center animate-fade-in">
                  Thank you for subscribing to our newsletter!
                </p>
              )}
              
              <p className="text-souk-500 text-xs mt-4 text-center">
                By subscribing, you agree to our Privacy Policy and consent to receive marketing communications.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Mail, Phone, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1560472952-d01cb0260abf?w=1600" 
            alt="Souk Market" 
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-souk-900/60"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Souk Market</h1>
            <p className="text-xl text-white/90 max-w-xl">
              Celebrating artisanal craftsmanship and cultural heritage from around the world
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-souk-900 mb-6">Our Story</h2>
                <p className="text-souk-700 mb-4">
                  Souk Market was founded in 2015 with a simple mission: to connect artisans from 
                  around the world with people who appreciate handcrafted quality and cultural 
                  heritage. We believe that every handmade item tells a story - of tradition, 
                  of craftsmanship, and of the artisan who created it.
                </p>
                <p className="text-souk-700 mb-4">
                  Our journey began when our founder, Sarah, traveled through Morocco and was 
                  captivated by the rich traditions of craftsmanship she encountered in the 
                  bustling souks. She realized that many of these skilled artisans had limited 
                  access to global markets where their work would be truly valued.
                </p>
                <p className="text-souk-700">
                  Today, Souk Market works directly with over 200 artisans across 15 countries, 
                  ensuring fair compensation and sustainable practices while bringing their 
                  beautiful creations to customers worldwide.
                </p>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=800" 
                  alt="Souk Market Founder" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 px-4 bg-souk-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-souk-900 mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-souk-900 mb-4">Authentic Craftsmanship</h3>
                <p className="text-souk-700">
                  We celebrate traditional techniques and authentic handcrafted quality. Each item in 
                  our collection is made by skilled artisans who have often inherited their craft 
                  through generations.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-souk-900 mb-4">Ethical Sourcing</h3>
                <p className="text-souk-700">
                  We work directly with artisans and small cooperatives, ensuring fair compensation 
                  and ethical working conditions. We're committed to transparency throughout our 
                  supply chain.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-souk-900 mb-4">Cultural Preservation</h3>
                <p className="text-souk-700">
                  By supporting traditional crafts, we help preserve cultural heritage and techniques 
                  that might otherwise be lost. We share the stories behind each craft tradition.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-souk-900 mb-12 text-center">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Founder & CEO",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                },
                {
                  name: "Mohammed Alami",
                  role: "Artisan Relations",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                },
                {
                  name: "Priya Sharma",
                  role: "Product Curator",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400"
                },
                {
                  name: "David Chen",
                  role: "Operations Director",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-souk-900">{member.name}</h3>
                  <p className="text-souk-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Us */}
        <section className="py-16 px-4 bg-souk-800 text-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="mr-3 text-souk-300 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-souk-300">123 Artisan Street, Marrakech, Morocco</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="mr-3 text-souk-300 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-souk-300">hello@soukmarket.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="mr-3 text-souk-300 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-souk-300">+212 5 24 43 12 34</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="mr-3 text-souk-300 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-medium">Hours</h4>
                      <p className="text-souk-300">Monday-Friday: 9AM-6PM</p>
                      <p className="text-souk-300">Saturday: 10AM-4PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="p-2 bg-souk-700 rounded-full hover:bg-souk-600 transition-colors">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="p-2 bg-souk-700 rounded-full hover:bg-souk-600 transition-colors">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="p-2 bg-souk-700 rounded-full hover:bg-souk-600 transition-colors">
                      <Twitter size={20} />
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-6">Send Us a Message</h3>
                
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full p-3 rounded-md bg-souk-700 text-white border border-souk-600 focus:outline-none focus:ring-2 focus:ring-souk-400"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full p-3 rounded-md bg-souk-700 text-white border border-souk-600 focus:outline-none focus:ring-2 focus:ring-souk-400"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-1">Your Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full p-3 rounded-md bg-souk-700 text-white border border-souk-600 focus:outline-none focus:ring-2 focus:ring-souk-400"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-souk-500 text-white rounded-md font-medium hover:bg-souk-400 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;

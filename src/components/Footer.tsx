
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, PhoneCall, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-souk-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-6">Souk Market</h3>
            <p className="text-souk-200 mb-6 max-w-xs">
              Connecting artisans with customers worldwide, bringing the authentic 
              market experience to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-souk-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-souk-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-souk-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-souk-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-souk-200 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-souk-200 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-souk-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-souk-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/account" className="text-souk-200 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-souk-200 hover:text-white transition-colors">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-souk-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-souk-200 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-souk-200 hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-souk-300 flex-shrink-0 mt-0.5" />
                <span className="text-souk-200">
                  123 Market Street, Old Town District, City
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={20} className="mr-3 text-souk-300 flex-shrink-0" />
                <span className="text-souk-200">+1 (234) 567-8910</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-souk-300 flex-shrink-0" />
                <span className="text-souk-200">hello@soukmarket.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-souk-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-souk-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Souk Market. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-souk-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-souk-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/sellers" className="text-sm text-souk-300 hover:text-white transition-colors">
              Become a Seller
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold text-souk-900 transition-all duration-300"
        >
          Souk Market
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-souk-800 hover-underline">Home</Link>
          <Link to="/products" className="text-souk-800 hover-underline">Products</Link>
          <Link to="/categories" className="text-souk-800 hover-underline">Categories</Link>
          <Link to="/about" className="text-souk-800 hover-underline">About</Link>
          {user?.role === 'seller' && (
            <Link to="/dashboard" className="text-souk-800 hover-underline">Dashboard</Link>
          )}
        </nav>

        {/* Desktop Right Icons */}
        <div className="hidden md:flex items-center space-x-6">
          <button className="text-souk-800 hover:text-souk-600 transition-colors">
            <Search size={20} />
          </button>
          <Link to={user ? "/account" : "/login"} className="text-souk-800 hover:text-souk-600 transition-colors">
            <User size={20} />
          </Link>
          <Link to="/cart" className="text-souk-800 hover:text-souk-600 transition-colors relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-souk-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-souk-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-souk-800 py-2 border-b border-souk-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-souk-800 py-2 border-b border-souk-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/categories" 
              className="text-souk-800 py-2 border-b border-souk-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="text-souk-800 py-2 border-b border-souk-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            {user?.role === 'seller' && (
              <Link 
                to="/dashboard" 
                className="text-souk-800 py-2 border-b border-souk-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <div className="flex items-center space-x-6 py-2">
              <Link 
                to={user ? "/account" : "/login"} 
                className="text-souk-800 flex items-center space-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={18} />
                <span>{user ? 'Account' : 'Login'}</span>
              </Link>
              <Link 
                to="/cart" 
                className="text-souk-800 flex items-center space-x-2 relative"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
                <span className="absolute -top-2 left-3 bg-souk-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Dummy cart items - to be replaced with actual cart state management
const initialCartItems = [
  {
    id: '1',
    name: 'Tapis Berbère Traditionnel',
    price: 999,
    image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=2787&auto=format&fit=crop',
    quantity: 1,
    category: 'Artisanat'
  },
  {
    id: '2',
    name: 'Coussin Kilim',
    price: 299,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop',
    quantity: 2,
    category: 'Textile'
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const proceedToCheckout = () => {
    // Save cart to localStorage or state management before navigating
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-souk-900 mb-6 flex items-center">
          <ShoppingCart className="mr-3" />
          Mon Panier {cartItems.length > 0 && `(${cartItems.length})`}
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-souk-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={32} className="text-souk-500" />
            </div>
            <h2 className="text-xl font-semibold text-souk-900 mb-3">Votre panier est vide</h2>
            <p className="text-souk-600 mb-8 max-w-md mx-auto">
              Vous n'avez aucun article dans votre panier actuellement. Découvrez nos produits artisanaux.
            </p>
            <Link
              to="/products"
              className="bg-souk-700 hover:bg-souk-800 text-white px-6 py-3 rounded-md font-medium inline-flex items-center button-hover"
            >
              Découvrir nos produits
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items - Left column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-souk-50 text-souk-700 font-medium">
                  <div className="col-span-6">Produit</div>
                  <div className="col-span-2 text-center">Prix</div>
                  <div className="col-span-2 text-center">Quantité</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item.id} className="border-b border-souk-100 last:border-b-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                      {/* Product */}
                      <div className="md:col-span-6 flex items-center">
                        <Link to={`/product/${item.id}`} className="flex-shrink-0 w-20 h-20 bg-souk-100 rounded overflow-hidden mr-4">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </Link>
                        <div>
                          <Link to={`/product/${item.id}`} className="font-medium text-souk-900 hover:text-souk-700">
                            {item.name}
                          </Link>
                          <p className="text-sm text-souk-500">{item.category}</p>
                          <span className="md:hidden text-souk-900 font-medium block mt-1">
                            {item.price} MAD
                          </span>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="hidden md:block md:col-span-2 text-center text-souk-900">
                        {item.price} MAD
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden text-souk-700">Quantité:</span>
                        <div className="flex items-center border border-souk-300 rounded-md">
                          <button 
                            className="px-2 py-1 text-souk-500 hover:text-souk-900"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-2 py-1 text-souk-900 w-8 text-center">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-souk-500 hover:text-souk-900"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="md:col-span-2 flex justify-between md:justify-end items-center">
                        <span className="md:hidden text-souk-700">Total:</span>
                        <span className="font-medium text-souk-900">
                          {(item.price * item.quantity).toFixed(2)} MAD
                        </span>
                      </div>
                      
                      {/* Remove button */}
                      <div className="flex justify-end col-span-1 md:hidden lg:flex">
                        <button 
                          className="text-souk-500 hover:text-red-600 transition-colors p-1"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between">
                <Link to="/products" className="inline-flex items-center text-souk-700 hover:text-souk-900">
                  <ArrowLeft size={18} className="mr-2" />
                  Continuer les achats
                </Link>
              </div>
            </div>
            
            {/* Order summary - Right column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-bold text-souk-900 mb-4">Résumé de la commande</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-souk-600">
                    <span>Sous-total</span>
                    <span>{subtotal.toFixed(2)} MAD</span>
                  </div>
                  <div className="flex justify-between text-souk-600">
                    <span>Frais de livraison</span>
                    <span>{shipping.toFixed(2)} MAD</span>
                  </div>
                  <div className="border-t border-souk-200 pt-3 flex justify-between font-bold text-souk-900">
                    <span>Total</span>
                    <span>{total.toFixed(2)} MAD</span>
                  </div>
                </div>
                
                <button
                  className={`w-full bg-souk-700 hover:bg-souk-800 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center button-hover ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  onClick={proceedToCheckout}
                  disabled={loading || cartItems.length === 0}
                >
                  Procéder au paiement
                  <ArrowRight size={18} className="ml-2" />
                </button>
                
                <div className="mt-4 text-xs text-souk-500 text-center">
                  <p>Paiement sécurisé & remboursement garanti</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;

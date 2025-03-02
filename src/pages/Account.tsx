
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { User, Package, Heart, LogOut, ShoppingBag, Settings, MapPin, Clock, CheckCircle, ChevronRight, Truck, XCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Dummy orders data - to be replaced with API calls
const ordersData = [
  {
    id: 'ORD-12345',
    date: '2023-05-15',
    total: 1299,
    status: 'delivered',
    items: [
      {
        id: '1',
        name: 'Tapis Berbère Traditionnel',
        price: 999,
        image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?q=80&w=2787&auto=format&fit=crop',
        quantity: 1
      },
      {
        id: '2',
        name: 'Coussin Kilim',
        price: 299,
        image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop',
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-67890',
    date: '2023-04-20',
    total: 699,
    status: 'delivered',
    items: [
      {
        id: '3',
        name: 'Panier Tressé',
        price: 199,
        image: 'https://images.unsplash.com/photo-1609510368600-883b7f16d121?q=80&w=1965&auto=format&fit=crop',
        quantity: 1
      },
      {
        id: '4',
        name: 'Lanterne Marocaine',
        price: 349,
        image: 'https://images.unsplash.com/photo-1517821099606-cef63a9e210e?q=80&w=1974&auto=format&fit=crop',
        quantity: 1
      },
      {
        id: '5',
        name: 'Bol en Céramique',
        price: 149,
        image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000&auto=format&fit=crop',
        quantity: 1
      }
    ]
  }
];

// Status mapping
const statusMap = {
  pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  processing: { label: 'En cours', color: 'bg-blue-100 text-blue-800', icon: Clock },
  shipped: { label: 'Expédié', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Livré', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  cancelled: { label: 'Annulé', color: 'bg-red-100 text-red-800', icon: XCircle }
};

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState('orders');
  const [orders, setOrders] = useState(ordersData);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (!loggedIn) {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
      duration: 3000
    });
    
    navigate('/login');
  };
  
  const renderTabContent = () => {
    switch (currentTab) {
      case 'orders':
        return (
          <>
            <h2 className="text-xl font-bold text-souk-900 mb-6">Mes commandes</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-souk-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={24} className="text-souk-500" />
                </div>
                <h3 className="text-lg font-medium text-souk-900 mb-2">Aucune commande</h3>
                <p className="text-souk-600 mb-6">Vous n'avez pas encore passé de commande.</p>
                <Link
                  to="/products"
                  className="bg-souk-700 hover:bg-souk-800 text-white px-4 py-2 rounded-md font-medium inline-flex items-center button-hover"
                >
                  Découvrir nos produits
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const status = statusMap[order.status as keyof typeof statusMap];
                  const StatusIcon = status?.icon;
                  
                  return (
                    <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-souk-100 flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center">
                            <span className="font-medium text-souk-900">{order.id}</span>
                            <span className="mx-2 text-souk-300">•</span>
                            <span className="text-souk-600">
                              {new Date(order.date).toLocaleDateString('fr-FR', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                              {StatusIcon && <StatusIcon size={14} className="mr-1" />}
                              {status.label}
                            </span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium text-souk-900">{order.total.toFixed(2)} MAD</p>
                          <p className="text-sm text-souk-600">{order.items.length} article(s)</p>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex-shrink-0 w-20">
                              <div className="w-20 h-20 rounded overflow-hidden mb-2">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-xs text-souk-900 truncate">{item.name}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <a href="#" className="text-sm text-souk-700 hover:text-souk-900 hover-underline">
                            Voir les détails
                          </a>
                          {order.status === 'delivered' && (
                            <button className="text-sm bg-souk-50 hover:bg-souk-100 text-souk-700 px-3 py-1.5 rounded">
                              Acheter à nouveau
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        );
        
      case 'favorites':
        return (
          <>
            <h2 className="text-xl font-bold text-souk-900 mb-6">Mes favoris</h2>
            
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-souk-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-souk-500" />
              </div>
              <h3 className="text-lg font-medium text-souk-900 mb-2">Aucun produit favori</h3>
              <p className="text-souk-600 mb-6">Vous n'avez pas encore ajouté de produits à vos favoris.</p>
              <Link
                to="/products"
                className="bg-souk-700 hover:bg-souk-800 text-white px-4 py-2 rounded-md font-medium inline-flex items-center button-hover"
              >
                Découvrir nos produits
              </Link>
            </div>
          </>
        );
        
      case 'settings':
        return (
          <>
            <h2 className="text-xl font-bold text-souk-900 mb-6">Paramètres du compte</h2>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-souk-900 mb-4">Informations personnelles</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-souk-700 mb-1">
                        Prénom
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                        defaultValue="Mohamed"
                        placeholder="Prénom"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-souk-700 mb-1">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                        defaultValue="Alami"
                        placeholder="Nom"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-souk-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                      defaultValue="mohamed.alami@example.com"
                      placeholder="Email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-souk-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                      defaultValue="+212 600 000 000"
                      placeholder="Téléphone"
                    />
                  </div>
                </div>
                
                <button className="mt-4 bg-souk-700 hover:bg-souk-800 text-white px-4 py-2 rounded-md font-medium button-hover">
                  Mettre à jour
                </button>
              </div>
              
              <div className="pt-6 border-t border-souk-200">
                <h3 className="text-lg font-medium text-souk-900 mb-4">Adresse de livraison</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-souk-700 mb-1">
                      Adresse
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                      defaultValue="123 Rue de la Médina, Quartier Hassan"
                      placeholder="Adresse"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-souk-700 mb-1">
                        Ville
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                        defaultValue="Rabat"
                        placeholder="Ville"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-souk-700 mb-1">
                        Code postal
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                        defaultValue="10000"
                        placeholder="Code postal"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-souk-700 mb-1">
                        Pays
                      </label>
                      <select
                        className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                        defaultValue="Maroc"
                      >
                        <option value="Maroc">Maroc</option>
                        <option value="Algérie">Algérie</option>
                        <option value="Tunisie">Tunisie</option>
                        <option value="France">France</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <button className="mt-4 bg-souk-700 hover:bg-souk-800 text-white px-4 py-2 rounded-md font-medium button-hover">
                  Mettre à jour
                </button>
              </div>
              
              <div className="pt-6 mt-6 border-t border-souk-200">
                <h3 className="text-lg font-medium text-souk-900 mb-4">Sécurité</h3>
                <button className="text-souk-700 hover:text-souk-900 font-medium">
                  Changer le mot de passe
                </button>
              </div>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  if (!isLoggedIn) {
    return null; // Will redirect to login via useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-souk-900 mb-6 flex items-center">
          <User className="mr-3" />
          Mon compte
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-souk-700 flex items-center justify-center text-white">
                  <span className="text-xl font-bold">
                    {localStorage.getItem('userName')?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-souk-900">
                    {localStorage.getItem('userName') || 'Utilisateur'}
                  </p>
                  <p className="text-sm text-souk-500">Client</p>
                </div>
              </div>
              
              <nav className="space-y-1">
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    currentTab === 'orders' 
                      ? 'bg-souk-100 text-souk-900 font-medium' 
                      : 'text-souk-700 hover:bg-souk-50'
                  }`}
                  onClick={() => setCurrentTab('orders')}
                >
                  <Package size={20} />
                  <span>Mes commandes</span>
                </button>
                
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    currentTab === 'favorites' 
                      ? 'bg-souk-100 text-souk-900 font-medium' 
                      : 'text-souk-700 hover:bg-souk-50'
                  }`}
                  onClick={() => setCurrentTab('favorites')}
                >
                  <Heart size={20} />
                  <span>Mes favoris</span>
                </button>
                
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    currentTab === 'settings' 
                      ? 'bg-souk-100 text-souk-900 font-medium' 
                      : 'text-souk-700 hover:bg-souk-50'
                  }`}
                  onClick={() => setCurrentTab('settings')}
                >
                  <Settings size={20} />
                  <span>Paramètres</span>
                </button>
                
                <button
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  <span>Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;

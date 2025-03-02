
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, MapPin, Truck, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Dummy cart items - in real app, this would come from cart state or localStorage
const cartItems = [
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

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Maroc',
    paymentMethod: 'cash',
    saveInfo: false
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 50;
  const total = subtotal + shipping;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate address form
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
          !formData.address || !formData.city || !formData.postalCode) {
        toast({
          title: "Erreur de validation",
          description: "Veuillez remplir tous les champs obligatoires.",
          variant: "destructive"
        });
        return;
      }
      
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      // Process order
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        
        // Clear cart and navigate to success page
        localStorage.removeItem('cartItems');
        
        toast({
          title: "Commande confirmée!",
          description: "Votre commande a été enregistrée avec succès.",
          duration: 5000
        });
        
        navigate('/account');
      }, 1500);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-souk-900 mb-6">Finaliser votre commande</h1>
        
        {/* Checkout Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-souk-700 text-white' : 'bg-souk-200 text-souk-500'
            }`}>
              <MapPin size={18} />
              <span className="sr-only">Livraison</span>
            </div>
            <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-souk-700' : 'bg-souk-200'}`}></div>
            <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-souk-700 text-white' : 'bg-souk-200 text-souk-500'
            }`}>
              <CreditCard size={18} />
              <span className="sr-only">Paiement</span>
            </div>
            <div className="flex-1 h-0.5 mx-2 bg-souk-200"></div>
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-souk-200 text-souk-500">
              <CheckCircle size={18} />
              <span className="sr-only">Confirmation</span>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium">
            <span className={step >= 1 ? 'text-souk-700' : 'text-souk-500'}>Livraison</span>
            <span className={step >= 2 ? 'text-souk-700' : 'text-souk-500'}>Paiement</span>
            <span className="text-souk-500">Confirmation</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <>
                    <h2 className="text-lg font-bold text-souk-900 mb-4 flex items-center">
                      <MapPin size={20} className="mr-2" />
                      Adresse de livraison
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-souk-700 mb-1">
                          Prénom *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-souk-700 mb-1">
                          Nom *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-souk-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-souk-700 mb-1">
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-souk-700 mb-1">
                          Adresse *
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          rows={3}
                          className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-souk-700 mb-1">
                            Ville *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-souk-700 mb-1">
                            Code postal *
                          </label>
                          <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                            value={formData.postalCode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-souk-700 mb-1">
                            Pays *
                          </label>
                          <select
                            id="country"
                            name="country"
                            className="w-full px-4 py-2 rounded-md border border-souk-300 focus:ring-2 focus:ring-souk-500 focus:border-transparent"
                            value={formData.country}
                            onChange={handleChange}
                            required
                          >
                            <option value="Maroc">Maroc</option>
                            <option value="Algérie">Algérie</option>
                            <option value="Tunisie">Tunisie</option>
                            <option value="France">France</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="saveInfo"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleChange}
                        className="h-4 w-4 text-souk-700 focus:ring-souk-500 border-souk-300 rounded"
                      />
                      <label htmlFor="saveInfo" className="ml-2 block text-sm text-souk-700">
                        Sauvegarder ces informations pour mes prochaines commandes
                      </label>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="inline-flex items-center text-souk-700 hover:text-souk-900"
                      >
                        <ArrowLeft size={18} className="mr-2" />
                        Retour au panier
                      </button>
                      
                      <button
                        type="submit"
                        className="bg-souk-700 hover:bg-souk-800 text-white px-6 py-3 rounded-md font-medium inline-flex items-center button-hover"
                      >
                        Continuer au paiement
                        <ArrowRight size={18} className="ml-2" />
                      </button>
                    </div>
                  </>
                )}
                
                {step === 2 && (
                  <>
                    <h2 className="text-lg font-bold text-souk-900 mb-4 flex items-center">
                      <CreditCard size={20} className="mr-2" />
                      Mode de paiement
                    </h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="border rounded-md p-4 flex items-center space-x-3 bg-souk-50">
                        <input
                          type="radio"
                          id="cashOnDelivery"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleChange}
                          className="h-4 w-4 text-souk-700 focus:ring-souk-500 border-souk-300"
                        />
                        <label htmlFor="cashOnDelivery" className="flex flex-col">
                          <span className="font-medium text-souk-900">Paiement à la livraison</span>
                          <span className="text-sm text-souk-600">Payez en espèces lors de la livraison</span>
                        </label>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-souk-900 mb-2">Récapitulatif de livraison</h3>
                    <div className="bg-souk-50 rounded-md p-4 mb-6">
                      <div className="flex items-start">
                        <MapPin size={20} className="text-souk-700 flex-shrink-0 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                          <p className="text-souk-700 text-sm">{formData.address}</p>
                          <p className="text-souk-700 text-sm">{formData.postalCode}, {formData.city}, {formData.country}</p>
                          <p className="text-souk-700 text-sm">{formData.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center text-souk-700 hover:text-souk-900"
                      >
                        <ArrowLeft size={18} className="mr-2" />
                        Retour aux informations
                      </button>
                      
                      <button
                        type="submit"
                        className={`bg-souk-700 hover:bg-souk-800 text-white px-6 py-3 rounded-md font-medium inline-flex items-center button-hover ${
                          loading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                      >
                        {loading ? 'Traitement en cours...' : 'Confirmer la commande'}
                        {!loading && <ArrowRight size={18} className="ml-2" />}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
          
          {/* Order Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-souk-900 mb-4">Résumé de la commande</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border border-souk-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute top-0 right-0 bg-souk-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-sm font-medium text-souk-900">{item.name}</h3>
                      <p className="text-xs text-souk-500">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-souk-900 font-medium">
                        {(item.price * item.quantity).toFixed(2)} MAD
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-souk-200 pt-4 space-y-3 mb-6">
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
              
              <div className="bg-souk-50 rounded p-4 flex items-start">
                <Truck size={20} className="text-souk-700 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-souk-700">
                  Livraison estimée entre <span className="font-medium">3-5 jours ouvrables</span> après confirmation de la commande.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;

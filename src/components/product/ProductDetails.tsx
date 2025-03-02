
import { useState } from 'react';
import { ChevronUp, ChevronDown, Truck, Shield, Clock } from 'lucide-react';

interface ProductDetailsProps {
  description: string;
  features: string[];
}

const ProductDetails = ({ description, features }: ProductDetailsProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Description */}
      <div className="border border-souk-200 rounded-lg overflow-hidden">
        <button 
          className="w-full flex justify-between items-center p-4 text-left font-medium text-souk-900"
          onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
        >
          Description et caractéristiques
          {isDescriptionOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {isDescriptionOpen && (
          <div className="p-4 pt-0 border-t border-souk-200">
            <p className="text-souk-700 mb-4">
              {description}
            </p>
            <h4 className="font-medium text-souk-900 mb-2">Caractéristiques:</h4>
            <ul className="list-disc list-inside space-y-1 text-souk-700">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Shipping & Returns */}
      <div className="border border-souk-200 rounded-lg overflow-hidden">
        <button 
          className="w-full flex justify-between items-center p-4 text-left font-medium text-souk-900"
          onClick={() => setIsShippingOpen(!isShippingOpen)}
        >
          Livraison et retours
          {isShippingOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {isShippingOpen && (
          <div className="p-4 pt-0 border-t border-souk-200 space-y-4">
            <div className="flex items-start">
              <Truck size={20} className="mr-3 text-souk-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-souk-900 mb-1">Livraison</h4>
                <p className="text-souk-700 text-sm">
                  Livraison standard en 3-5 jours ouvrables. Livraison express disponible.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield size={20} className="mr-3 text-souk-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-souk-900 mb-1">Garantie</h4>
                <p className="text-souk-700 text-sm">
                  Tous nos produits artisanaux sont garantis authentiques et de haute qualité.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock size={20} className="mr-3 text-souk-700 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-souk-900 mb-1">Retours</h4>
                <p className="text-souk-700 text-sm">
                  Retours acceptés dans les 14 jours suivant la réception si le produit est en parfait état.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

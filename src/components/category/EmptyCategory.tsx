
import { Link } from 'react-router-dom';

const EmptyCategory = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Aucun produit trouvé
      </h2>
      <p className="text-gray-600 mb-8">
        Nous n'avons pas encore de produits dans cette catégorie.
      </p>
      <Link 
        to="/categories" 
        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-souk-600 text-white hover:bg-souk-700 transition-colors"
      >
        Voir toutes les catégories
      </Link>
    </div>
  );
};

export default EmptyCategory;

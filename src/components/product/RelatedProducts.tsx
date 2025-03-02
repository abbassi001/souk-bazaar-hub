
import ProductCard from '../ProductCard';

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-souk-900 mb-6">Produits similaires</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;


import { Product } from '@/types/product';
import ProductCard from '../ProductCard';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-96 rounded-lg bg-gray-200 animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
          isNew={product.isNew}
        />
      ))}
    </div>
  );
};

export default ProductGrid;

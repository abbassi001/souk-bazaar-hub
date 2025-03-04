
import { useState, useEffect, useCallback } from 'react';
import { Product } from '@/types/product';
import ProductCard from '../ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  itemsPerPage?: number;
}

const ProductGrid = ({ products, isLoading, itemsPerPage = 6 }: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    // Reset to page 1 when products change
    setCurrentPage(1);
  }, [products]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayedProducts(products.slice(start, end));
  }, [currentPage, products, itemsPerPage]);

  const goToPage = useCallback((page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  }, []);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-96 rounded-lg bg-gray-200 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
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

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-8">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className="h-8 w-8"
          >
            <ChevronLeft size={16} />
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => goToPage(i + 1)}
              className="h-8 w-8"
            >
              {i + 1}
            </Button>
          ))}
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className="h-8 w-8"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;

import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { ImageOff } from 'lucide-react';
import ReactPaginate from 'react-paginate';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  itemsPerPage?: number;
}

const ProductGrid = ({ products, isLoading, itemsPerPage = 8 }: ProductGridProps) => {
  const [itemOffset, setItemOffset] = React.useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentProducts = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };
  
  return (
    <div>
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-10 h-10 border-t-4 border-souk-700 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-souk-200 bg-white">
                  {product.is_new && (
                    <div className="absolute top-2 left-2 z-10 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      New
                    </div>
                  )}
                  {product.is_featured && (
                    <div className="absolute top-2 right-2 z-10 bg-souk-700 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </div>
                  )}
                  
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-souk-100 rounded flex items-center justify-center">
                      <ImageOff size={32} className="text-souk-400" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-white text-souk-900 px-4 py-2 rounded-full font-medium text-sm hover:bg-souk-50 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h3 className="text-souk-900 font-medium">
                    <Link to={`/product/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-souk-700">
                    {parseFloat(product.price.toString()).toFixed(2)} MAD
                    {product.old_price && (
                      <span className="ml-2 text-sm line-through text-souk-400">
                        {parseFloat(product.old_price.toString()).toFixed(2)} MAD
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center mt-8 space-x-2"
            pageClassName="px-4 py-2 rounded-md text-souk-700 hover:bg-souk-100 transition-colors"
            activeClassName="bg-souk-700 text-white"
            previousClassName="px-4 py-2 rounded-md text-souk-700 hover:bg-souk-100 transition-colors"
            nextClassName="px-4 py-2 rounded-md text-souk-700 hover:bg-souk-100 transition-colors"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakClassName="px-4 py-2 rounded-md text-souk-700"
          />
        </>
      )}
    </div>
  );
};

export default ProductGrid;

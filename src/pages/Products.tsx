
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Filter, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/category/ProductGrid';
import { Product } from '@/types/product';
import { supabase } from '@/lib/supabase';

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 150 });
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Available categories
  const categories = [
    'All Products',
    'Home Decor',
    'Textiles',
    'Furniture',
    'Tableware',
    'Gourmet',
    'Storage'
  ];

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) {
          throw error;
        }

        // Transform data to match our Product interface
        const transformedProducts: Product[] = data.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          old_price: product.old_price ? parseFloat(product.old_price) : undefined,
          image: product.image || 'https://images.unsplash.com/photo-1612323795550-e50ea0b9acab?w=800',
          rating: product.rating ? parseFloat(product.rating) : undefined,
          reviews: product.reviews,
          is_new: product.is_new,
          is_featured: product.is_featured,
          category: product.category,
          seller_id: product.seller_id,
          created_at: product.created_at,
          updated_at: product.updated_at
        }));

        setAllProducts(transformedProducts);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        toast({
          title: 'Error',
          description: 'Failed to load products. Please try again later.',
          variant: 'destructive',
        });
        // Set to empty array to avoid undefined errors
        setAllProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [toast]);

  // Filter products based on search, category and price
  useEffect(() => {
    if (allProducts.length === 0) {
      setFilteredProducts([]);
      return;
    }

    const filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, allProducts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-souk-900 mb-2">Our Products</h1>
          <p className="text-souk-600">
            Discover our collection of handcrafted treasures from across the globe.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-souk-500" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-souk-200 rounded-md focus:outline-none focus:ring-2 focus:ring-souk-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <button 
              className="w-full md:w-auto px-4 py-3 border border-souk-200 rounded-md flex items-center justify-center text-souk-700 hover:bg-souk-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} className="mr-2" />
              Filters
            </button>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="mb-8 p-6 border border-souk-200 rounded-lg bg-white shadow-sm">
            <h2 className="text-lg font-medium text-souk-900 mb-4">Filter Products</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-souk-700 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={category}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2 text-souk-600 focus:ring-souk-500"
                      />
                      <label htmlFor={category} className="text-souk-600">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-souk-700 mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="min-price" className="block text-xs text-souk-500 mb-1">
                      Min Price
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      min="0"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="w-full p-2 border border-souk-200 rounded-md focus:outline-none focus:ring-1 focus:ring-souk-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="block text-xs text-souk-500 mb-1">
                      Max Price
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      min="0"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-full p-2 border border-souk-200 rounded-md focus:outline-none focus:ring-1 focus:ring-souk-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-souk-600 hover:text-souk-800"
                onClick={() => {
                  setSelectedCategory('All Products');
                  setPriceRange({ min: 0, max: 150 });
                }}
              >
                Reset Filters
              </button>
              <button 
                className="px-4 py-2 bg-souk-700 text-white rounded-md hover:bg-souk-800"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
        
        {/* Results count */}
        <div className="mb-6">
          <p className="text-souk-600">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        
        {/* Products grid with pagination */}
        {filteredProducts.length > 0 ? (
          <ProductGrid 
            products={filteredProducts} 
            isLoading={isLoading} 
            itemsPerPage={8}
          />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-souk-800 mb-2">
              {isLoading ? 'Loading products...' : 'No products found'}
            </h3>
            {!isLoading && (
              <p className="text-souk-600">Try adjusting your search or filter criteria</p>
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;

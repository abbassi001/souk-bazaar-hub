
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, AlertCircle, Search, ImageOff, PlusCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { categoryNames } from '@/types/product';
import type { Product } from '@/types/product';

const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        categoryNames[product.category]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const fetchSellerProducts = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger vos produits. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (id: string) => {
    navigate(`/seller/edit-product/${id}`);
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id);
      
      if (error) throw error;
      
      setProducts(products.filter(p => p.id !== productToDelete.id));
      toast({
        title: 'Produit supprimé',
        description: 'Le produit a été supprimé avec succès.',
      });
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le produit. Veuillez réessayer.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setProductToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="w-10 h-10 border-t-4 border-souk-700 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-souk-500" size={20} />
          <Input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2"
          />
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-souk-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-souk-700 border-b border-souk-200">Image</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-souk-700 border-b border-souk-200">Nom</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-souk-700 border-b border-souk-200">Catégorie</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-souk-700 border-b border-souk-200">Prix</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-souk-700 border-b border-souk-200">Statut</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-souk-700 border-b border-souk-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-souk-50 transition-colors">
                  <td className="py-3 px-4 border-b border-souk-100">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-souk-100 rounded flex items-center justify-center">
                        <ImageOff size={16} className="text-souk-400" />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-souk-100 text-souk-800 font-medium">
                    {product.name}
                  </td>
                  <td className="py-3 px-4 border-b border-souk-100 text-souk-600">
                    {categoryNames[product.category] || product.category}
                  </td>
                  <td className="py-3 px-4 border-b border-souk-100 text-souk-800">
                    {parseFloat(product.price.toString()).toFixed(2)} MAD
                    {product.old_price && (
                      <span className="ml-2 text-sm line-through text-souk-400">
                        {parseFloat(product.old_price.toString()).toFixed(2)} MAD
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-souk-100">
                    {product.is_featured ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
                        Mis en avant
                      </span>
                    ) : product.is_new ? (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Nouveau
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b border-souk-100">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Pencil size={14} className="mr-1" />
                        Modifier
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700 hover:border-red-200 hover:bg-red-50"
                        onClick={() => setProductToDelete(product)}
                      >
                        <Trash2 size={14} className="mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center border border-dashed border-souk-300 rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-souk-400 mb-4" />
          <h3 className="text-lg font-medium text-souk-800 mb-2">
            Aucun produit trouvé
          </h3>
          <p className="text-souk-600 mb-6">
            {searchTerm 
              ? `Aucun résultat pour "${searchTerm}"`
              : "Vous n'avez pas encore de produits. Commencez par en ajouter un."}
          </p>
          <Button 
            onClick={() => navigate('/seller/add-product')}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un produit
          </Button>
        </div>
      )}
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le produit "{productToDelete?.name}" ? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setProductToDelete(null)}
              disabled={isDeleting}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProduct}
              disabled={isDeleting}
            >
              {isDeleting ? 'Suppression...' : 'Supprimer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsTable;

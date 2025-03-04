
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: WishlistItem) => {
    setItems(currentItems => {
      const exists = currentItems.some(i => i.id === item.id);
      if (!exists) {
        toast({
          title: "Ajouté aux favoris",
          description: `${item.name} a été ajouté à vos favoris`,
          duration: 3000,
        });
        return [...currentItems, item];
      }
      return currentItems;
    });
  }, [toast]);

  const removeItem = useCallback((id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      const newItems = currentItems.filter(item => item.id !== id);
      
      if (itemToRemove) {
        toast({
          title: "Retiré des favoris",
          description: `${itemToRemove.name} a été retiré de vos favoris`,
          duration: 3000,
        });
      }
      
      return newItems;
    });
  }, [toast]);

  const isInWishlist = useCallback((id: string) => {
    return items.some(item => item.id === id);
  }, [items]);

  return (
    <WishlistContext.Provider value={{
      items,
      addItem,
      removeItem,
      isInWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

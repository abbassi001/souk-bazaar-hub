
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Optimized version with useCallback
  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...newItem, quantity: 1 }];
    });

    toast({
      title: "Ajouté au panier",
      description: `${newItem.name} a été ajouté à votre panier`,
      duration: 3000,
    });
  }, [toast]);

  const removeItem = useCallback((id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      const newItems = currentItems.filter(item => item.id !== id);
      
      if (itemToRemove) {
        toast({
          title: "Article retiré",
          description: `${itemToRemove.name} a été retiré de votre panier`,
          duration: 3000,
        });
      }
      
      return newItems;
    });
  }, [toast]);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    toast({
      title: "Panier vidé",
      description: "Tous les articles ont été retirés de votre panier",
      duration: 3000,
    });
  }, [toast]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

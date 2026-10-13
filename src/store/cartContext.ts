import { createContext, useContext } from 'react';
import type { Product, CartItem, AddOn } from '@/types';

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, addOns?: AddOn[]) => void;
  removeFromCart: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

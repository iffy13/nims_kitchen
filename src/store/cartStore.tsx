import { useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import type { Product, CartItem, AddOn } from '@/types';
import { getProductById } from '@/data/products';
import { makeLineId, cartSubtotal } from '@/lib/cart';
import { CartContext } from '@/store/cartContext';

const STORAGE_KEY = 'nims-kitchen-cart-v1';

/** Restore the cart from the browser, re-reading products so prices/availability are always current. */
function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const saved = JSON.parse(raw) as { productId: string; addOnIds: string[]; quantity: number }[];
    return saved.flatMap((s) => {
      const product = getProductById(s.productId);
      if (!product || !product.available || !(s.quantity > 0)) return [];
      const addOns = (product.addOns ?? []).filter((a) => s.addOnIds.includes(a.id));
      return [{ lineId: makeLineId(product.id, addOns), product, quantity: s.quantity, selectedAddOns: addOns }];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          items.map((i) => ({
            productId: i.product.id,
            addOnIds: i.selectedAddOns.map((a) => a.id),
            quantity: i.quantity,
          }))
        )
      );
    } catch {
      // Storage unavailable (private mode etc.) — cart just won't survive a refresh.
    }
  }, [items]);

  const addToCart = useCallback((product: Product, quantity = 1, addOns: AddOn[] = []) => {
    const lineId = makeLineId(product.id, addOns);
    setItems((prev) =>
      prev.some((i) => i.lineId === lineId)
        ? prev.map((i) => (i.lineId === lineId ? { ...i, quantity: i.quantity + quantity } : i))
        : [...prev, { lineId, product, quantity, selectedAddOns: addOns }]
    );
  }, []);

  const removeFromCart = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((i) => i.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.lineId !== lineId)
        : prev.map((i) => (i.lineId === lineId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal: cartSubtotal(items),
      count: items.reduce((c, i) => c + i.quantity, 0),
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

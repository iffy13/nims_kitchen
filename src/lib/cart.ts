import type { AddOn, CartItem } from '@/types';

export const makeLineId = (productId: string, addOns: AddOn[]) =>
  [productId, ...addOns.map((a) => a.id).sort()].join('|');

export const unitPrice = (item: Pick<CartItem, 'product' | 'selectedAddOns'>) =>
  item.product.price + item.selectedAddOns.reduce((sum, a) => sum + a.price, 0);

export const lineTotal = (item: CartItem) => unitPrice(item) * item.quantity;

export const cartSubtotal = (items: CartItem[]) => items.reduce((t, i) => t + lineTotal(i), 0);
